// AdminDashboard.jsx - Fixed with Visible Hamburger Menu
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminStats from "./AdminStats";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header - Visible on small screens */}
      <div className="block md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button - Make sure this is visible */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white bg-gray-800 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              style={{ display: 'block' }}
            >
              {/* Hamburger Icon as text fallback */}
              <span className="text-2xl block leading-none">☰</span>
            </button>
            <div>
              <h2 className="text-lg font-bold">SaiStore Admin</h2>
              <p className="text-gray-400 text-xs">Order Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Slides from left when open */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div className="fixed top-0 left-0 w-80 h-full bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-5 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-white text-xl font-bold">Admin Panel</h2>
                  <p className="text-gray-400 text-xs mt-1">Order Management</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>
            
            <nav className="mt-4">
              <button
                onClick={() => {
                  setActiveTab("stats");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
                  activeTab === "stats" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
                }`}
              >
                <span className="text-2xl">📊</span>
                <span className="text-base">Dashboard Stats</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
                  activeTab === "orders" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
                }`}
              >
                <span className="text-2xl">📦</span>
                <span className="text-base">Orders</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("products");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
                  activeTab === "products" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
                }`}
              >
                <span className="text-2xl">🛍️</span>
                <span className="text-base">Products</span>
              </button>
            </nav>
            
            <div className="absolute bottom-0 w-full p-5 border-t border-gray-800 bg-gray-900">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 text-base font-medium"
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-xl z-10">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-white text-2xl font-bold">Admin Panel</h2>
          <p className="text-gray-400 text-sm mt-1">Order Management</p>
        </div>
        
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full text-left px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
              activeTab === "stats" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
            }`}
          >
            <span className="text-xl">📊</span>
            <span>Dashboard Stats</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
              activeTab === "orders" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
            }`}
          >
            <span className="text-xl">📦</span>
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full text-left px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-3 ${
              activeTab === "products" ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
            }`}
          >
            <span className="text-xl">🛍️</span>
            <span>Products</span>
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-64">
        {/* Add top padding for mobile header */}
        <div className="pt-16 md:pt-0">
          <div className="p-4 md:p-8">
            {activeTab === "stats" && <AdminStats />}
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "products" && <AdminProducts />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;