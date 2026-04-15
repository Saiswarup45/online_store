// AdminStats.jsx
import { useState, useEffect } from "react";

function AdminStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalProducts: 0,
    recentOrders: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    const totalRevenue = orders
      .filter(order => order.status !== "cancelled")
      .reduce((sum, order) => sum + (order.total || 0), 0);

    setStats({
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      pendingOrders: orders.filter(o => o.status === "pending").length,
      deliveredOrders: orders.filter(o => o.status === "delivered").length,
      totalProducts: 0,
      recentOrders: orders.slice(0, 5)
    });
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm md:text-base mt-1">Welcome back, Admin!</p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-4 md:p-6 text-white">
          <div className="text-2xl md:text-3xl mb-2">📊</div>
          <div className="text-xl md:text-2xl font-bold">{stats.totalOrders}</div>
          <div className="text-xs md:text-sm opacity-90">Total Orders</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-4 md:p-6 text-white">
          <div className="text-2xl md:text-3xl mb-2">💰</div>
          <div className="text-lg md:text-2xl font-bold truncate">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-xs md:text-sm opacity-90">Total Revenue</div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow p-4 md:p-6 text-white">
          <div className="text-2xl md:text-3xl mb-2">⏳</div>
          <div className="text-xl md:text-2xl font-bold">{stats.pendingOrders}</div>
          <div className="text-xs md:text-sm opacity-90">Pending Orders</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-4 md:p-6 text-white">
          <div className="text-2xl md:text-3xl mb-2">✅</div>
          <div className="text-xl md:text-2xl font-bold">{stats.deliveredOrders}</div>
          <div className="text-xs md:text-sm opacity-90">Delivered Orders</div>
        </div>
      </div>

      {/* Recent Orders - Responsive Table */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">Order ID</th>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">Customer</th>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">Amount</th>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">Status</th>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm">#{order.id?.slice(-6)}</td>
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                    {order.customer?.firstName} {order.customer?.lastName}
                  </td>
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold">₹{order.total?.toLocaleString()}</td>
                  <td className="px-3 md:px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      order.status === "delivered" ? "bg-green-100 text-green-800" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {order.status || "pending"}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-3 md:px-4 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminStats;