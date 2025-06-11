import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

export default function Banner() {
  const { user } = useAuth();
  const role = useRole();

  return (
    <div className="bg-[#6fa1bd] h-screen bg-gradient-to-br to-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Find the Right Talent, Right Now
      </h1>
      <p className="text-lg md:text-2xl mb-8">
        Connect with top Bangladeshi freelancers and bring your project to life
        <br />- affordably, professionally, and efficiently
      </p>
      <div className="flex gap-4">
        {user?.email ? (
          <>
            {role === "buyer" ? (
              <>
                <Link to="/buyer/dashboard">
                  <button className="bg-white text-[#6fa1bd] border-black font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer">
                    Dashboard
                  </button>
                </Link>
                <Link to="/buyer/profile">
                  <button className="bg-transparent border-2 border-[#6fa1bd]  font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-[#6fa1bd] transition cursor-pointer">
                    Profile
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/freelancer/dashboard">
                  <button className="bg-white border-2 border-gray-100 text-[#6fa1bd] font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer">
                    Dashboard
                  </button>
                </Link>
                <Link to="/freelancer/profile">
                  <button className="bg-transparent border-2 border-[#6fa1bd]  font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-[#6fa1bd] transition cursor-pointer">
                    Profile
                  </button>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <button className="bg-white text-[#6fa1bd] border-black font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition cursor-pointer">
                Get Started
              </button>
            </Link>
            <Link to="/about-us">
              <button className="bg-transparent border-2 border-[#6fa1bd]  font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-[#6fa1bd] transition cursor-pointer">
                About Us
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
