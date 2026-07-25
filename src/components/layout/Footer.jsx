import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; 

const Footer = () => {
  return (
    <div className="w-full bg-zap-gray pb-12 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto bg-[#111111] rounded-[2.5rem] py-16 px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <img src={logo} alt="ParCelGo" className="h-10 object-contain brightness-0 invert" />
          <span className="text-3xl font-extrabold text-white tracking-tight">ParCelGo</span>
        </div>

        {/* Description */}
        <p className="text-[#a0a0a0] max-w-2xl text-[15px] leading-relaxed mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Divider */}
        <div className="w-full max-w-4xl border-t border-dashed border-[#333333] mb-8"></div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-[#e0e0e0] text-[15px]">
          <Link to="/services" className="hover:text-[#c4f05b] transition-colors">Services</Link>
          <Link to="/coverage" className="hover:text-[#c4f05b] transition-colors">Coverage</Link>
          <Link to="/about" className="hover:text-[#c4f05b] transition-colors">About Us</Link>
          <Link to="/pricing" className="hover:text-[#c4f05b] transition-colors">Pricing</Link>
          <Link to="/blog" className="hover:text-[#c4f05b] transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-[#c4f05b] transition-colors">Contact</Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl border-t border-dashed border-[#333333] mb-10"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          {/* LinkedIn */}
          <a href="#" className="w-10 h-10 rounded-full bg-[#0a66c2] flex items-center justify-center text-white hover:scale-110 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          {/* X (Twitter) */}
          <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          {/* Facebook */}
          <a href="#" className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          {/* YouTube */}
          <a href="#" className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:scale-110 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
