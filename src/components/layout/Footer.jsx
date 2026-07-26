import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; 

const Footer = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Message sent successfully!');
        e.target.reset();
      } else {
        console.log("Error", data);
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.log("Error", error);
      setStatus('An error occurred. Please try again.');
    }
    
    // Clear status after a few seconds
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="w-full bg-zap-gray pb-12 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto bg-[#111111] rounded-[2.5rem] py-16 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Side - Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center lg:justify-start gap-3">
            <img src={logo} alt="ParCelGo" className="h-10 object-contain brightness-0 invert" />
            <span className="text-3xl font-extrabold text-white tracking-tight">ParCelGo</span>
          </div>

          {/* Description */}
          <p className="text-[#a0a0a0] max-w-lg text-[15px] leading-relaxed mb-10">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>

          {/* Divider */}
          <div className="w-full max-w-lg border-t border-dashed border-[#333333] mb-8"></div>

          {/* Contact Info */}
          <div className="w-full max-w-lg flex flex-col sm:flex-row gap-8 mb-10 justify-center lg:justify-start">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[#c4f05b] font-bold text-sm tracking-wider uppercase mb-2">Email Us</span>
              <a href="mailto:tamjidulislamsamim@gmail.com" className="text-[#e0e0e0] hover:text-white transition-colors">tamjidulislamsamim@gmail.com</a>
            </div>
            <div className="flex flex-col items-center sm:items-start sm:border-l border-dashed border-[#333333] sm:pl-8">
              <span className="text-[#c4f05b] font-bold text-sm tracking-wider uppercase mb-2">Call Us</span>
              <a href="tel:01743597989" className="text-[#e0e0e0] hover:text-white transition-colors">01743597989</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start gap-5">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/md-samim5669/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0a66c2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/mdshamim5669" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/Tamjidul.islam.sham3m" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>

        {/* Right Side - Feedback Form */}
        <div className="w-full bg-[#f8f9fa] rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-[#6b7280] tracking-widest uppercase">Visitor Name *</label>
                <input type="text" name="name" required placeholder="ENTER YOUR NAME" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c4f05b] focus:ring-1 focus:ring-[#c4f05b] text-sm text-gray-700 bg-white placeholder-gray-400 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-[#6b7280] tracking-widest uppercase">Email Address *</label>
                <input type="email" name="email" required placeholder="NAME@EXAMPLE.COM" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c4f05b] focus:ring-1 focus:ring-[#c4f05b] text-sm text-gray-700 bg-white placeholder-gray-400 transition-all" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-[#6b7280] tracking-widest uppercase">Subject Matter *</label>
              <input type="text" name="subject" required placeholder="INQUIRY OR PROJECT DISCUSSION" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c4f05b] focus:ring-1 focus:ring-[#c4f05b] text-sm text-gray-700 bg-white placeholder-gray-400 transition-all" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-[#6b7280] tracking-widest uppercase">Message Body *</label>
              <textarea name="message" required placeholder="KEY IN YOUR MESSAGE DETAILS..." rows="4" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#c4f05b] focus:ring-1 focus:ring-[#c4f05b] text-sm text-gray-700 bg-white placeholder-gray-400 resize-none transition-all"></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
              <div className={`text-sm font-semibold ${status.includes('successfully') ? 'text-green-600' : status.includes('error') || status.includes('Failed') ? 'text-red-600' : 'text-gray-600'}`}>
                {status}
              </div>
              <button 
                type="submit" 
                disabled={status === 'Sending...'}
                className="w-full sm:w-auto bg-[#111111] hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                {status !== 'Sending...' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.45 7.227-7.223-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Footer;
