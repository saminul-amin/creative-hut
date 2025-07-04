import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userLogOut } = useAuth();
  const role = useRole();

  const navLinks = [
    ...(user
      ? role === "buyer"
        ? [
            { name: "Dashboard", href: "/buyer/dashboard" },
            { name: "Create Job", href: "/buyer/post-job" },
            { name: "My Projects", href: "/buyer/my-projects" },
            { name: "Courses", href: "/courses" },
            { name: "Profile", href: "/buyer/profile" },
            { name: "Sign Out" },
          ]
        : [
            { name: "Dashboard", href: "/freelancer/dashboard" },
            { name: "Browse Jobs", href: "/freelancer/browse-jobs" },
            { name: "My Gigs", href: "/freelancer/my-gigs" },
            { name: "Courses", href: "/courses" },
            { name: "Profile", href: "/freelancer/profile" },
            { name: "Sign Out" },
          ]
      : [
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about-us" },
          { name: "Courses", href: "/courses" },
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
            className="text-2xl font-bold transition-all duration-400 ease-in-out transform hover:scale-105 cursor-pointer hover:text-shadow hover:shadow-2xl"
          >
            CreativeHut
          </Link>
          <div className="hidden md:flex space-x-8 font-bold">
            {navLinks.map((link) =>
              link.name === "Sign Out" ? (
                <button
                  key={link.name}
                  onClick={handleSignOut}
                  className="transition-all duration-300 ease-in-out transform px-4 py-2 cursor-pointer hover:scale-105 hover:underline"
                >
                  {link.name}
                </button>
              ) : (
                <Link key={link.name} to={link.href}>
                  <button
                    className={`transition-all duration-300 ease-in-out transform px-4 py-2 cursor-pointer hover:scale-105 hover:underline ${
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
            <button
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
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
