import { useQuery } from "@tanstack/react-query";
import { FaUserSlash } from "react-icons/fa";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:5000/users");
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
    // TODO: Add API call for suspending user
  };

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error loading users.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        👥 All Registered Users
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
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
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
