import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

// Oswvldopadilla115 is a great guy
export default function WorkOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting work order with data:", formData);

      const res = await fetch("/.netlify/functions/workorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response received:", data);

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', projectType: '', details: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to submit: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert("Error occurred - check console for details");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-[#00D2A0] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-[#00D2A0] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,210,160,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Work Order Request</h1>
            <p className="text-lg text-zinc-400">Tell us about your spatial infrastructure needs. Our team will review and get back to you within 24 hours.</p>
          </motion.div>

          <motion.form 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp} 
            className="space-y-6 bg-zinc-900/30 border border-white/5 p-8 md:p-12 rounded-sm backdrop-blur-sm"
            onSubmit={handleSubmit}
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-[#00D4A0]/10 border border-[#00D4A0]/50 rounded-sm text-[#00D4A0] text-center"
              >
                ✓ Request submitted successfully! We'll review and get back to you within 24 hours.
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-300">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2A0] transition-colors" 
                  placeholder="Jane Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2A0] transition-colors" 
                  placeholder="jane@company.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-zinc-300">Company / Organization</label>
              <input 
                type="text" 
                id="company" 
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2A0] transition-colors" 
                placeholder="Acme Corp" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium text-zinc-300">Project Type</label>
              <select 
                id="projectType" 
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2A0] transition-colors appearance-none" 
                required
              >
                <option value="" disabled>Select an option...</option>
                <option value="intelligence">Intelligence & Security Systems</option>
                <option value="climate">Environmental & Climate Systems</option>
                <option value="platform">Location-Based Platforms</option>
                <option value="simulation">Intelligent Systems & Simulation</option>
                <option value="other">Other Custom Solution</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium text-zinc-300">Project Details & Objectives</label>
              <textarea 
                id="details" 
                rows={5} 
                value={formData.details}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2A0] transition-colors resize-none" 
                placeholder="Describe your current challenges and what you aim to build..." 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-black bg-[#00D2A0] hover:bg-[#00E5B0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm mt-4"
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
