import React, { useState } from 'react';

export default function ContactForm({ id }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    interest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // ✅ EXISTING SCRIPT (DO NOT REMOVE)
    const BACKEND_URL =
      'https://script.google.com/macros/s/AKfycbx5s96jS_TqrTF_xnQQlvd1uDNPLizqAaz0CHE-8LCgM6OXHupjnFfyxkkr_lTVOhHMHA/exec';

    // ✅ NEW SCRIPT (SECOND RECEIVER)
    const SECOND_BACKEND_URL =
      'https://script.google.com/macros/s/AKfycbzNzfD_N1-9J0u0rYK4DA1QVlHxxpE5xEcvjD1sRwrMknhjFY1cQEUkuZ__3kovr-Pf/exec';

    try {
      // 🔹 First email
      await fetch(BACKEND_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 🔹 Second email
      await fetch(SECOND_BACKEND_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        interest: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id} className="w-full max-w-6xl mx-auto pt-16 px-4 relative font-quincy">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
          <rect x="19" y="0" width="2" height="40" fill="black" />
          <path d="M10 40 C10 30 30 30 30 40 L30 60 C30 70 10 70 10 60 Z" fill="black" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12">
        <div className="w-full md:w-1/2 md:mt-12">
          <h2 className="text-4xl font-serif mb-2 text-gray-900">
            Have an Idea? Let's Discuss.
          </h2>
          <p className="text-gray-700 mb-1">Thank you for getting in touch.</p>
          <p className="text-gray-700 mb-1">
            Kindly fill the form and have a great day!
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full border-b py-2" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full border-b py-2" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border-b py-2" />
              <select name="country" value={formData.country} onChange={handleChange} className="w-full border-b py-2">
                <option value="uk">United Kingdom</option>
              </select>
              <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="w-full border-b py-2" />
              <select name="interest" value={formData.interest} onChange={handleChange} className="w-full border-b py-2">
                <option value="" disabled>Interested in</option>
                <option value="curtains">Curtains</option>
                <option value="blinds">Blinds</option>
                <option value="shutters">Shutters</option>
                <option value="other">Other</option>
              </select>
            </div>

            <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full border-b py-2" />

            {submitStatus && (
              <div className="mt-3 text-sm text-green-700">
                {submitStatus.message}
              </div>
            )}

            <button disabled={isSubmitting} className="mt-4 px-10 py-2 bg-gray-300">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
