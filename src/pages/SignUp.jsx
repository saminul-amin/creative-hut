import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("buyer");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, userGoogleSignIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("https://creative-hut-server.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        role: selectedRole,
      }),
    })
      .then((res) => res.json())
      .then((mongoData) => {
        console.log("Saved to MongoDB:", mongoData);

        fetch("http://localhost:8000/users/", {
          method: "POST",
          body: new URLSearchParams({
            name: data.name,
            email: data.email,
            role: selectedRole,
            id: mongoData._id,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((res) => res.json())
          .then((pgData) => {
            console.log("Saved to PostgreSQL:", pgData);
            fetch(`http://localhost:8000/users/by-email/${data.email}`)
              .then((res) => res.json())
              .then((pgUser) => {
                console.log("PostgreSQL user:", pgUser);
                localStorage.setItem("pg_user_id", pgUser.id);
              });

            if (mongoData.insertId !== null) {
              createUser(data.email, data.password).then((res) => {
                console.log(res.user);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Account Created Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: mongoData.message,
              });
            }
          })
          .catch((err) => {
            console.error("FastAPI error:", err);
            Swal.fire({
              icon: "error",
              title: "FastAPI Error",
              text: "User saved to MongoDB, but not to PostgreSQL.",
            });
          });
      });
  };

  const handleGoogleSignUp = () => {
    userGoogleSignIn()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6fa1bd] to-white flex items-center justify-center pt-32 p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-[#6fa1bd] mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create an Account
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Role Push Toggle */}
          <motion.div
            className="flex gap-4 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <input type="hidden" {...register("role")} />

            <button
              type="button"
              onClick={() => handleRoleSelect("buyer")}
              className={`flex-1 p-3 rounded-lg border font-medium transition cursor-pointer ${
                selectedRole === "buyer"
                  ? "bg-[#6fa1bd] text-white border-[#6fa1bd]"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              I'm a Buyer
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("freelancer")}
              className={`flex-1 p-3 rounded-lg border font-medium transition cursor-pointer ${
                selectedRole === "freelancer"
                  ? "bg-[#6fa1bd] text-white border-[#6fa1bd]"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              I'm a Freelancer
            </button>
          </motion.div>

          {/* ✅ Conditional NID Field for Freelancers */}
          {selectedRole === "freelancer" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <input
                type="text"
                {...register("nid", {
                  required: "NID number is required for freelancers",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 digits",
                  },
                })}
                placeholder="NID Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nid.message}
                </p>
              )}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="w-full bg-[#6fa1bd] text-white py-3 rounded-lg font-semibold hover:bg-[#5a8aa3] transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign Up
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        {/* Google Sign Up Button */}
        <motion.button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 488 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v97.9h134.1c-5.8 31.2-23.2 57.6-49.4 75.3v62h79.8c46.8-43.1 74.5-106.4 74.5-183.5z"
              fill="#4285F4"
            />
            <path
              d="M249 512c67.6 0 124.3-22.4 165.8-60.8l-79.8-62c-22.2 15-50.7 23.9-86 23.9-66.1 0-122.2-44.5-142.1-104.2H24.1v65.4C65.4 466.2 150.5 512 249 512z"
              fill="#34A853"
            />
            <path
              d="M106.9 308.9c-5.1-15-8.1-31-8.1-47.5s2.9-32.5 8.1-47.5V148H24.1C8.5 181.6 0 219.3 0 261.4s8.5 79.8 24.1 113.4l82.8-65.9z"
              fill="#FBBC04"
            />
            <path
              d="M249 100.7c36.7 0 69.8 12.6 95.8 37.5l71.8-71.8C373.2 24.6 316.5 0 249 0 150.5 0 65.4 45.8 24.1 148l82.8 65.4c19.9-59.7 76-104.2 142.1-104.2z"
              fill="#EA4335"
            />
          </svg>
          Sign Up with Google
        </motion.button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-stone-500 hover:text-yellow-700 hover:underline font-medium transition duration-200"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
