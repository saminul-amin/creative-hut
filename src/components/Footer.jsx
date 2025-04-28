import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#a8c6d7] pt-12 pb-3">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <Link>
            <h2 className="text-2xl font-bold mb-4">CreativeHut</h2>
          </Link>
          <p className="text-sm">
            Empowering your journey with innovation and excellence. Let's build
            the future together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-bold">Email:</span> support@creativehut.com
            </li>
            <li>
              <span className="font-bold">Phone:</span> +880 1398 745 632
            </li>
            <li>
              <span className="font-bold">Address:</span> Mirpur, Dhaka,
              Bangladesh.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-white/30 pt-3 text-center text-sm">
        &copy; {new Date().getFullYear()} CreativeHut. All rights reserved.
      </div>
    </footer>
  );
}
