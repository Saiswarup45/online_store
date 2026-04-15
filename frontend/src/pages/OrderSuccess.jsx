import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <i className="fas fa-exclamation-circle text-6xl text-blue-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Order Found</h2>
            <p className="text-gray-500 mb-6">Please complete your checkout first</p>
            <Link to="/checkout" className="inline-block bg-blue-500 text-gray-950 px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">
              Go to Checkout
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleClearOrder = () => {
    localStorage.removeItem("lastOrder");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-4xl text-green-600"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-6">Thank you for your purchase</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600">Order ID: <span className="font-bold text-gray-800">{order.id}</span></p>
            <p className="text-gray-600 mt-1">Order Date: {new Date(order.date).toLocaleString()}</p>
            <p className="text-gray-600 mt-1">Payment Method: <span className="font-medium capitalize">{order.paymentMethod.replace(/([A-Z])/g, ' $1').trim()}</span></p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST)</span>
                <span>₹{order.tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-black">₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mb-6 text-left">
            <h3 className="font-bold text-gray-800 mb-3">Delivery Address</h3>
            <p className="text-gray-600 text-sm">
              {order.customer.firstName} {order.customer.lastName}<br />
              {order.customer.address}<br />
              {order.customer.city}, {order.customer.state} {order.customer.zipCode}<br />
              {order.customer.country}<br />
              <span className="mt-2 block">Phone: {order.customer.phone}</span>
              <span>Email: {order.customer.email}</span>
            </p>
          </div>
          
          <div className="space-y-3">
            <Link to="/" onClick={handleClearOrder} className="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">
              Continue Shopping
            </Link>
            <Link to="/" onClick={handleClearOrder} className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;