import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Other'];

const RequestCall = () => {
  const [form, setForm] = useState({ number: '', time: '', language: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.message === 'Emails sent successfully') {
        setSubmitted(true);
      } else {
        setError('There was a problem submitting your request. Please try again.');
      }
    } catch (err) {
      setError('There was a problem submitting your request. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-start pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-brand-green mb-6 text-center">Request a Call</h2>
          {submitted ? (
            <div className="text-center">
              <h3 className="text-xl font-bold text-brand-green mb-4">Thank you!</h3>
              <p className="text-gray-700 mb-2">We have received your request and will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email"
                  type="email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  value={form.number}
                  onChange={e => setForm({ ...form, number: e.target.value })}
                  placeholder="Your Phone Number"
                  type="tel"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Preferred Call Time</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  placeholder="Select date and time"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Preferred Language</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  value={form.language}
                  onChange={e => setForm({ ...form, language: e.target.value })}
                  required
                >
                  <option value="">Select language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              {error && <div className="text-center text-red-600 font-semibold mb-4">{error}</div>}
              <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green-light text-white text-lg font-bold rounded-lg shadow-lg" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Request Call'}
              </Button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default RequestCall; 