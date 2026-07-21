"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // TODO: replace with your actual email-sending endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* left heading */}
        <div className="md:w-64 shrink-0">
          <span className="text-sm uppercase tracking-widest text-white/40">
            Contact
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white leading-tight">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-white/50 max-w-xs">
            Have a project in mind or just want to say hi? Drop a message below.
          </p>
        </div>

        {/* right form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-white/50">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="rounded-lg border border-white/15 bg-white/3 px-4 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-white/50">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-white/15 bg-white/3 px-4 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm text-white/50">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="resize-none rounded-lg border border-white/15 bg-white/3 px-4 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40"
              placeholder="Tell me a bit about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
            <Send
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>

          {status === "success" && (
            <p className="text-sm text-green-400">
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;