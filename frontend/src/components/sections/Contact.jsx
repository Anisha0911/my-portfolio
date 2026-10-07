import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { personal } from "../../data/portfolio";
import { SectionHeading, Magnetic, Marquee } from "../common";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Add a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API}/contact`, data);
      setSent(true);
      reset();
      toast.success("Message sent — I'll be in touch soon!");
      setTimeout(() => setSent(false), 4000);
    } catch (e) {
      toast.error("Something went wrong. Please try again or email me directly.");
    }
  };

  const field = "w-full bg-transparent border-b border-border py-4 text-lg focus:border-brand outline-none transition-colors placeholder:text-muted-foreground/60";

  return (
    <section id="contact" className="relative pt-24 md:pt-32" data-testid="contact-section">
      <div className="py-8 border-y border-border mb-20">
        <Marquee items={["LET'S TALK", "AVAILABLE FOR WORK", "GET IN TOUCH"]} />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <SectionHeading no="10" label="Contact" title={<>Let's build<br />something<br /><span className="text-brand">amazing.</span></>} />
          <div className="mt-12 space-y-6">
            <a href={`mailto:${personal.email}`} data-testid="contact-email-link" className="flex items-center gap-4 group">
              <span className="h-11 w-11 flex items-center justify-center border border-border group-hover:border-brand group-hover:text-brand transition-colors"><Mail size={18} /></span>
              <span className="group-hover:text-brand transition-colors">{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone.replace(/\s/g, "")}`} data-testid="contact-phone-link" className="flex items-center gap-4 group">
              <span className="h-11 w-11 flex items-center justify-center border border-border group-hover:border-brand group-hover:text-brand transition-colors"><Phone size={18} /></span>
              <span className="group-hover:text-brand transition-colors">{personal.phone}</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="h-11 w-11 flex items-center justify-center border border-border"><MapPin size={18} /></span>
              <span>{personal.location}</span>
            </div>
          </div>
          <div className="mt-10 overflow-hidden border border-border h-56">
            <iframe
              title="Location map"
              src="https://www.google.com/maps?q=Kandivali,Mumbai&output=embed"
              className="w-full h-full grayscale"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <input {...register("name")} data-testid="contact-name-input" placeholder="Your name" className={field} />
                {errors.name && <p className="text-destructive text-sm mt-2" data-testid="error-name">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register("email")} data-testid="contact-email-input" placeholder="Email address" className={field} />
                {errors.email && <p className="text-destructive text-sm mt-2" data-testid="error-email">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <input {...register("subject")} data-testid="contact-subject-input" placeholder="Subject" className={field} />
              {errors.subject && <p className="text-destructive text-sm mt-2" data-testid="error-subject">{errors.subject.message}</p>}
            </div>
            <div>
              <textarea {...register("message")} data-testid="contact-message-input" rows={5} placeholder="Tell me about your project..." className={`${field} resize-none`} />
              {errors.message && <p className="text-destructive text-sm mt-2" data-testid="error-message">{errors.message.message}</p>}
            </div>
            <Magnetic
              type="submit"
              disabled={isSubmitting || sent}
              data-testid="contact-submit-btn"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand text-white text-sm uppercase tracking-[0.15em] hover:bg-brand-hover transition-colors disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span key="load" className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Sending</motion.span>
                ) : sent ? (
                  <motion.span key="done" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2"><Check size={18} /> Sent</motion.span>
                ) : (
                  <motion.span key="idle">Send Message</motion.span>
                )}
              </AnimatePresence>
            </Magnetic>
          </form>
        </div>
      </div>
    </section>
  );
}
