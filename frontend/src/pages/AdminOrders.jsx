// AdminOrders.jsx
import { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
    setLoading(false);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const filteredOrders = orders.filter(order => order.id !== orderId);
      setOrders(filteredOrders);
      localStorage.setItem("orders", JSON.stringify(filteredOrders));
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status?.toLowerCase() === filter.toLowerCase();
  });

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status !== "cancelled")
      .reduce((sum, order) => sum + (order.total || 0), 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-500 text-sm md:text-base mt-1">Manage and track customer orders</p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="text-xl md:text-2xl mb-2">📦</div>
          <div className="text-xl md:text-2xl font-bold">{orders.length}</div>
          <div className="text-xs md:text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="text-xl md:text-2xl mb-2">💰</div>
          <div className="text-lg md:text-2xl font-bold truncate">₹{getTotalRevenue().toLocaleString()}</div>
          <div className="text-xs md:text-sm text-gray-500">Revenue</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="text-xl md:text-2xl mb-2">⏳</div>
          <div className="text-xl md:text-2xl font-bold">
            {orders.filter(o => o.status === "pending").length}
          </div>
          <div className="text-xs md:text-sm text-gray-500">Pending Orders</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="text-xl md:text-2xl mb-2">✅</div>
          <div className="text-xl md:text-2xl font-bold">
            {orders.filter(o => o.status === "delivered").length}
          </div>
          <div className="text-xs md:text-sm text-gray-500">Delivered</div>
        </div>
      </div>

      {/* Filter Tabs - Horizontal Scroll on Mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg capitalize text-sm md:text-base whitespace-nowrap ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Section - Stack on Mobile */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Orders Table - Horizontal Scroll on Mobile */}
        <div className={`${selectedOrder ? 'lg:w-1/2' : 'w-full'} bg-white rounded-lg shadow overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 md:px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">
                        #{order.id?.slice(-6)}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                        {order.customer?.firstName} {order.customer?.lastName}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm font-bold text-gray-900">
                        ₹{order.total?.toLocaleString()}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status || "pending"}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Panel - Full Width on Mobile */}
        {selectedOrder && (
          <div className="lg:w-1/2 bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg md:text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Order Information</h3>
                  <p className="text-sm text-gray-600">ID: {selectedOrder.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Customer Details</h3>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}
                  </p>
                  <p className="text-sm text-gray-600 break-all">{selectedOrder.customer?.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer?.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Shipping Address</h3>
                <p className="text-sm text-gray-600">{selectedOrder.customer?.address}</p>
                <p className="text-sm text-gray-600">
                  {selectedOrder.customer?.city}, {selectedOrder.customer?.state}
                </p>
                <p className="text-sm text-gray-600">{selectedOrder.customer?.zipCode}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Items</h3>
                <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1 border-b">
                      <span className="flex-1">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>₹{selectedOrder.shipping?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>₹{selectedOrder.tax?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base md:text-lg mt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{selectedOrder.total?.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Update Status</h3>
                <div className="flex gap-2 flex-wrap">
                  {["pending", "processing", "shipped", "delivered", "cancelled"].map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm capitalize ${
                        selectedOrder.status === status
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;