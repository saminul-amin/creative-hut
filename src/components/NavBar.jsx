import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userLogOut } = useAuth();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    ...(user
      ? [{ name: "Sign Out" }]
      : [
          { name: "Log in", href: "/login" },
          { name: "Sign Up", href: "/sign-up" },
        ]),
  ];

  const handleSignOut = () => {
    userLogOut().then(() => console.log("Logged Out"));
  };

  return (
    <nav className="bg-[#6fa1bd] fixed w-full backdrop-blur-sm z-50 opacity-80">
      <div className="p-4 max-w-7xl mx-auto">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to={"/"}
            className="text-2xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-300 cursor-pointer"
          >
            CreativeHut
          </Link>
          <div className="hidden md:flex space-x-8 font-bold">
            {navLinks.map((link) =>
              link.name === "Sign Out" ? (
                <button
                  key={link.name}
                  onClick={handleSignOut}
                  className="transition-all duration-300 ease-in-out transform px-4 py-2 cursor-pointer hover:scale-105 hover:text-yellow-300"
                >
                  {link.name}
                </button>
              ) : (
                <Link key={link.name} to={link.href}>
                  <button
                    className={`transition-all duration-300 ease-in-out transform px-4 py-2 cursor-pointer hover:scale-105 hover:text-yellow-300 ${
                      link.name === "Get Started" &&
                      "bg-stone-400 hover:bg-stone-600 rounded-2xl"
                    }`}
                  >
                    {link.name}
                  </button>
                </Link>
              )
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block hover:underline transition"
              >
                <button className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-300 cursor-pointer">
                  {link.name}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
