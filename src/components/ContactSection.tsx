import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const INFO_ITEMS = [
  {
    label: "Physical Address",
    value: "20 Alhaji Salami Street, Aguda Surulere\nLagos, Nigeria",
    href: "https://www.google.com/maps/search/20+Alhaji+Salami+Street,+Aguda+Surulere+Lagos,+Nigeria",
  },
  {
    label: "Phone",
    value: "+234912801069",
    href: "tel:+234912801069",
  },
  {
    label: "Email",
    value: "teams@ozcorelabs.com",
    href: "mailto:teams@ozcorelabs.com?subject=Enquiries",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message };

    try {
      console.log("Submitting form with payload:", payload);
      
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response received:", data);

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert("Error occurred - check console for details");
    }
  };
  return (
    <section id="contact" className="py-16 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Section label */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-[#00D4A0] font-mono text-sm uppercase tracking-wider mb-2 md:mb-4 block label-glow text-center"
        >
          Get Started
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 text-center"
        >
          <span className="label-glow inline-block">Your next decision deserves better spatial data.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-lg text-zinc-400 leading-relaxed mb-12 text-center max-w-3xl mx-auto"
        >
          Tell us what you're working on. No pitch decks, no pressure — just a focused conversation about what spatial intelligence can do for your product.
        </motion.p>

        {/* Split panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* LEFT — Info panel */}
          <div className="space-y-6">
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <p className="text-xs uppercase tracking-[0.1em] text-[#00D4A0] mb-2 font-mono">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  target={item.label === "Physical Address" ? "_blank" : undefined}
                  rel={item.label === "Physical Address" ? "noopener noreferrer" : undefined}
                  className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line hover:text-[#00D4A0] transition-colors"
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — Contact form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="w-14 h-14 rounded-full bg-[#00D4A0]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#00D4A0]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Sent! We'll be in touch.
                </h3>
                <p className="text-sm text-zinc-400">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="text-[#00D4A0] text-sm underline underline-offset-2 mt-2 hover:text-[#00E5B0]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="text-left space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="sr-only">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-[#00D4A0] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-[#00D4A0] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-[#00D4A0] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <input
                      type="text"
                      id="inquiry"
                      name="inquiry"
                      placeholder="Partnership / Demo / Inquiry"
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-[#00D4A0] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message-text" className="sr-only">Message</label>
                  <textarea
                    id="message-text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-[#00D4A0] focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-[#00D4A0] hover:bg-[#00E5B0] hover:shadow-[0_0_30px_rgba(0,210,160,0.15)] transition-all rounded-sm w-full md:w-auto min-w-[200px]"
                  >
                    Send Request
                  </button>

                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
