import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sampleCourses = [
  {
    id: 1,
    title: "Mastering React",
    instructor: "Samiul Amin",
    price: 0,
    category: "Development",
    thumbnail: "https://i.ibb.co/Zd14sdM/react-course.jpg",
    description: "Learn React.js from scratch and build powerful SPAs.",
  },
  {
    id: 2,
    title: "Advanced Tailwind CSS",
    instructor: "Fatima Noor",
    price: 25,
    category: "Design",
    thumbnail: "https://i.ibb.co/y4NkqDP/tailwind-course.jpg",
    description: "Build modern UI using Tailwind utility classes.",
  },
  {
    id: 3,
    title: "Fullstack with Node & PostgreSQL",
    instructor: "Tanvir Ahmed",
    price: 40,
    category: "Development",
    thumbnail: "https://i.ibb.co/SmqmvFw/backend-course.jpg",
    description:
      "Connect frontend with robust backend APIs using Node and PostgreSQL.",
  },
  {
    id: 4,
    title: "UI/UX Design for Developers",
    instructor: "Meem Rahman",
    price: 0,
    category: "Design",
    thumbnail: "https://i.ibb.co/yRs5kFg/uiux-course.jpg",
    description: "Understand UX principles and design eye-catching interfaces.",
  },
  {
    id: 5,
    title: "Digital Marketing 101",
    instructor: "Arif Islam",
    price: 15,
    category: "Marketing",
    thumbnail: "https://i.ibb.co/FxGTVgm/marketing-course.jpg",
    description: "Learn to market products through digital channels.",
  },
  // ... add more for pagination
];

const Courses = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("pg_user_id");
  const [filterType, setFilterType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const categories = ["All", "Development", "Design", "Marketing"];
  const filterOptions = ["All", "Free", "Paid"];

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/courses");
      setAllCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  fetchCourses();
}, []);

  // Filter logic
  const filteredCourses = sampleCourses.filter((course) => {
    const matchType =
      filterType === "All"
        ? true
        : filterType === "Free"
        ? course.price === 0
        : course.price > 0;

    const matchCategory =
      selectedCategory === "All" ? true : course.category === selectedCategory;

    return matchType && matchCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleEnroll = (courseId) => {
    if (!userId) {
      navigate("/login");
    } else {
      console.log("Enrolled in course:", courseId);
      // TODO: Call your backend API to record the enrollment
    }
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#6fa1bd] mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Courses
      </motion.h1>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {filterOptions.map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilterType(type);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-full border ${
              filterType === type
                ? "bg-[#6fa1bd] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-full border ${
              selectedCategory === cat
                ? "bg-blue-100 text-[#6fa1bd] font-semibold"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
        {paginatedCourses.map((course, i) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  By {course.instructor}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    course.price === 0
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </span>
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="text-sm text-[#6fa1bd] hover:underline font-medium"
                >
                  {userId ? "Enroll" : "Login to Enroll"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 text-sm rounded-full border ${
              currentPage === i + 1
                ? "bg-[#6fa1bd] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Courses;
