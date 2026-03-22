import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { XMarkIcon} from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-primary-light)]/30 mt-12 md:mt-16">
      <div className="page-shell py-10 md:py-12">
        <div className="rounded-3xl border border-[var(--color-primary-light)]/50 bg-white/75 p-6 md:p-8 shadow-sm">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl md:text-3xl font-bold heading-gradient mb-4 block">
              ShopIn
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Your one-stop destination for premium products and exceptional shopping experience.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-light)]/40 transition-colors">
                <FaFacebook className="w-5 h-5 text-[var(--color-primary-dark)]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-light)]/40 transition-colors">
                <FaInstagram className="w-5 h-5 text-[var(--color-primary-dark)]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-light)]/40 transition-colors">
                <XMarkIcon className="w-5 h-5 text-[var(--color-primary-dark)]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Home</Link></li>
              <li><Link to="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Shop</Link></li>
              <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">About Us</a></li>
              <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products/category/Electronics" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Electronics</Link></li>
              <li><Link to="/products/category/Fashion" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Fashion</Link></li>
              <li><Link to="/products/category/Home" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Home</Link></li>
              <li><Link to="/products/category/Beauty" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors">Beauty</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-[var(--color-primary-dark)] mt-1 flex-shrink-0" />
                <p className="text-[var(--color-text-secondary)] text-sm">Ayush Gandhi, Nadiad, India</p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[var(--color-primary-dark)] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors text-sm">+91 963 842 4721</a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-[var(--color-primary-dark)] flex-shrink-0" />
                <a href="mailto:support@ecommerce.com" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors text-sm">workayush2004@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-primary-light)] to-transparent mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-light)] text-sm text-center md:text-left">
            © {new Date().getFullYear()} Ecommerce. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-primary-dark)] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-primary-dark)] transition-colors text-sm">Terms & Conditions</a>
            <a href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-primary-dark)] transition-colors text-sm">Shipping Info</a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
