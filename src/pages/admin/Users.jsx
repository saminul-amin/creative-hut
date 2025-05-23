import { useQuery } from "@tanstack/react-query";
import { FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const fetchUsers = async () => {
  const res = await fetch("https://creative-hut-server.vercel.app/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const Users = () => {
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleSuspend = (user) => {
    console.log(`Suspend requested for user:`, user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Suspend him!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted permanently!",
          icon: "success",
        });
      }
    });
    // TODO: Add API call for suspending user
  };

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error loading users.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#6fa1bd] mb-6">
        All Registered Users
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3 font-medium">{user.name || "N/A"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleSuspend(user)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <FaUserSlash /> Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
