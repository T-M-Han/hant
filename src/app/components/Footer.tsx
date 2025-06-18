import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-gray-200/30 dark:border-gray-800/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        {/* Centered Container */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          
          {/* Social Links - Centered */}
          <div className="flex space-x-6">
            <Link
              href="https://github.com/T-M-Han"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/han2873292a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="mailto:thamyohan736@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>

          {/* Copyright - Centered */}
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} HANT
          </p>

          {/* Back to Top Button - Centered */}
          <Link
            href="#home"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            Back to top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}