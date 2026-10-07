import { Link } from "react-router-dom";
import { Magnetic } from "../components/common";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 grain" data-testid="not-found-page">
      <p className="font-serif text-[8rem] md:text-[14rem] leading-none tracking-tighter text-brand">404</p>
      <h1 className="font-serif text-3xl md:text-5xl tracking-tight mt-4">This page drifted off-grid.</h1>
      <p className="text-muted-foreground mt-4 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <Magnetic as="a" href="/" data-testid="notfound-home-btn" className="mt-10 inline-block px-8 py-4 bg-brand text-white text-sm uppercase tracking-[0.15em]">
        Back Home
      </Magnetic>
    </main>
  );
}
