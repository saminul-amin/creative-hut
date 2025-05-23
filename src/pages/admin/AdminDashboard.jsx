import { motion } from "framer-motion";
import { FaUserTie, FaUsers, FaMoneyCheckAlt, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const stats = {
  buyers: 128,
  freelancers: 412,
  revenue: 78950,
};

const payoutRequests = [
  { name: "Nusrat Jahan", amount: "$120", time: "2h ago" },
  { name: "Rafiul Hasan", amount: "$340", time: "4h ago" },
];

const verificationQueue = [
  { name: "Mehedi Hasan", submitted: "1h ago" },
  { name: "Sadia Afreen", submitted: "3h ago" },
];

const AdminDashboard = () => {
  return (
    <motion.div
      className="space-y-10 p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-blue-700">🛡 Admin Dashboard</h1>

      {/* User Stats & Revenue */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
          <h4 className="text-sm text-gray-500">Total Buyers</h4>
          <p className="text-xl font-bold text-gray-800">{stats.buyers}</p>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            View Buyers <FaArrowRight className="inline ml-1" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <FaUserTie className="text-2xl text-purple-600 mx-auto mb-2" />
          <h4 className="text-sm text-gray-500">Total Freelancers</h4>
          <p className="text-xl font-bold text-gray-800">{stats.freelancers}</p>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            View Freelancers <FaArrowRight className="inline ml-1" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <FaMoneyCheckAlt className="text-2xl text-green-600 mx-auto mb-2" />
          <h4 className="text-sm text-gray-500">Total Revenue</h4>
          <p className="text-xl font-bold text-gray-800">${stats.revenue.toLocaleString()}</p>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            View Revenue <FaArrowRight className="inline ml-1" />
          </button>
        </div>
      </motion.div>

      {/* Payout Requests */}
      <motion.div
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800">💸 Pending Payout Requests</h3>
          <button className="text-sm text-blue-600 hover:underline">
            Manage Payouts <FaArrowRight className="inline ml-1" />
          </button>
        </div>
        {payoutRequests.length ? (
          <ul className="space-y-2 text-sm text-gray-700">
            {payoutRequests.map((p, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{p.name}</span>
                <span>{p.amount} · {p.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No pending payout requests.</p>
        )}
      </motion.div>

      {/* Verification Queue */}
      <motion.div
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800">🔐 Verification Queue</h3>
          <button className="text-sm text-blue-600 hover:underline">
            View Verifications <FaArrowRight className="inline ml-1" />
          </button>
        </div>
        {verificationQueue.length ? (
          <ul className="space-y-2 text-sm text-gray-700">
            {verificationQueue.map((v, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{v.name}</span>
                <span>{v.submitted}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No pending verifications.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
