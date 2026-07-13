"use client";

import { useRef, useState } from "react";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import { sendMessage } from "../app/actions";

export default function ContactForm() {
  const [status, setStatus] = useState<{ success: boolean, message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const res = await sendMessage(formData);
    setStatus(res);
    if (res?.success) {
      formRef.current?.reset();
    }
  }

  return (
    <div className="w-md max-w-full">

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input
            id="contact-name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            className="w-full p-2 border rounded bg-(--accent-lightgreen) text-(--background) placeholder:text-(--background) placeholder:opacity-100"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">Your Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
            className="w-full p-2 border rounded bg-(--accent-lightgreen) text-(--background) placeholder:text-(--background) placeholder:opacity-100"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">Message</label>
          <textarea
            id="contact-message"
            name="message"
            autoComplete="off"
            placeholder="Message"
            className="w-full p-2 border rounded h-32 bg-(--accent-lightgreen) text-(--background)"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-(--background) text-(--foreground) px-4 py-2 rounded hover:bg-(--accent-tangerine) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition"
        >
          Send
        </button>
      </form>

      <p role="status" aria-live="polite" className="mt-4 flex flex-row items-center gap-2 text-(--foreground) empty:hidden">
        {status && (
          status.success
            ? <IoCheckmarkCircle className="text-(--accent-lightgreen) shrink-0" size={18} />
            : <IoAlertCircle className="text-(--accent-tangerine) shrink-0" size={18} />
        )}
        {status?.message}
      </p>
    </div>
  );
}
