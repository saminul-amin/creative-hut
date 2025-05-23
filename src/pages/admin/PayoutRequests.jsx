import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const dummyPayouts = [
  {
    id: "pr1",
    freelancer: "Sadia Afreen",
    method: "bKash",
    amount: "$120",
    date: "2025-05-21",
    status: "Pending",
  },
  {
    id: "pr2",
    freelancer: "Tanvir Islam",
    method: "Bank Transfer",
    amount: "$350",
    date: "2025-05-20",
    status: "Pending",
  },
  {
    id: "pr3",
    freelancer: "Faria Tamanna",
    method: "Nagad",
    amount: "$90",
    date: "2025-05-19",
    status: "Approved",
  },
];

const PayoutRequests = () => {
  const [requests, setRequests] = useState(dummyPayouts);

  const handleStatusChange = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#6fa1bd] mb-6">Payout Requests</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Freelancer</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3 font-medium">{req.freelancer}</td>
                <td className="px-4 py-3">{req.method}</td>
                <td className="px-4 py-3">{req.amount}</td>
                <td className="px-4 py-3">{req.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {req.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(req.id, "Approved")}
                        className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm cursor-pointer hover:underline"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(req.id, "Declined")}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm cursor-pointer hover:underline"
                      >
                        <FaTimes /> Decline
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic text-sm">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutRequests;
