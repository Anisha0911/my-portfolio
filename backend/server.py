from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Anisha Prajapati Portfolio API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


def _contact_email_html(payload: ContactCreate) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;padding:24px">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden">
          <tr><td style="background:#0a0a0a;padding:24px 32px;color:#ffffff;font-size:20px;font-weight:bold">New Portfolio Message</td></tr>
          <tr><td style="padding:32px">
            <p style="margin:0 0 12px;color:#111;font-size:15px"><strong>Name:</strong> {payload.name}</p>
            <p style="margin:0 0 12px;color:#111;font-size:15px"><strong>Email:</strong> {payload.email}</p>
            <p style="margin:0 0 12px;color:#111;font-size:15px"><strong>Subject:</strong> {payload.subject}</p>
            <p style="margin:20px 0 8px;color:#111;font-size:15px"><strong>Message:</strong></p>
            <p style="margin:0;color:#333;font-size:15px;line-height:1.6;white-space:pre-wrap">{payload.message}</p>
          </td></tr>
          <tr><td style="background:#f4f4f5;padding:16px 32px;color:#71717a;font-size:12px">Sent from your portfolio contact form</td></tr>
        </table>
      </td></tr>
    </table>
    """


@api_router.post("/contact")
async def create_contact(input: ContactCreate):
    msg = ContactMessage(**input.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())

    payload = {
        "to": [OWNER_EMAIL],
        "subject": f"Portfolio Contact: {input.subject}",
        "html": _contact_email_html(input),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": input.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        # message is saved; report soft failure
        return {"status": "saved", "email_sent": False, "message": "Message received."}
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return {"status": "saved", "email_sent": False, "message": "Message received."}

    return {"status": "success", "email_sent": True, "message": "Message sent successfully."}


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
