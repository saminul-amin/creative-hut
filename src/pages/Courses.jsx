import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Courses = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("pg_user_id");
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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
  useEffect(() => {
    const filtered = allCourses.filter((course) => {
      const matchType =
        filterType === "All"
          ? true
          : filterType === "Free"
          ? course.price === 0
          : course.price > 0;

      const matchCategory =
        category === "All" ? true : course.category === category;

      return matchType && matchCategory;
    });

    setFilteredCourses(filtered);
    setCurrentPage(1); // reset to page 1 on filter
  }, [allCourses, filterType, category]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/enrollments/${userId}`
        );
        // assuming the backend returns a list of course objects or course_ids
        const enrolledCourseIds = res.data.map((enroll) => enroll.course_id);
        setEnrolledCourses(enrolledCourseIds);
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
      }
    };

    fetchEnrollments();
  }, [userId]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleEnroll = async (courseId) => {
    if (!userId) {
      navigate("/login");
    } else {
      try {
        const formData = new URLSearchParams();
        formData.append("user_id", userId);
        formData.append("course_id", courseId);
        Swal.fire({
          title: "Are you sure?",
          text: "You will be enrolled in this course!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6fa1bd",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, confirm!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axios.post(
              "http://localhost:8000/enrollments/",
              formData,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            setEnrolledCourses((prev) => [...prev, courseId]);
            console.log("Enrollment response:", res.data);
            Swal.fire({
              title: "Enrolled!",
              text: "You have been succesfully enrolled in this course!",
              icon: "success",
            });
          }
        });
      } catch (err) {
        if (err.response?.data?.detail === "Already enrolled") {
          alert("You're already enrolled in this course.");
        } else {
          console.error("Enrollment failed:", err);
          alert("Failed to enroll in course.");
        }
      }
    }
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#6fa1bd] mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Courses
      </motion.h1>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-3 justify-center mb-3">
        {filterOptions.map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilterType(type);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 text-sm rounded-full border cursor-pointer ${
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
              setCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 text-sm rounded-full border cursor-pointer ${
              category === cat
                ? "bg-blue-100 text-[#6fa1bd] font-semibold"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="min-h-[200px]">
        {paginatedCourses.length > 0 ? (
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
                      disabled={userId && enrolledCourses.includes(course.id)}
                      className={`text-sm font-medium px-3 py-1 rounded transition ${
                        !userId
                          ? "text-[#6fa1bd] hover:underline cursor-pointer"
                          : enrolledCourses.includes(course.id)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "text-[#6fa1bd] hover:underline cursor-pointer"
                      }`}
                    >
                      {!userId
                        ? "Login to Enroll"
                        : enrolledCourses.includes(course.id)
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16 text-lg font-medium">
            No courses available for the selected criteria.
            <br />
            Please adjust your filters or check back later.
          </div>
        )}
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
