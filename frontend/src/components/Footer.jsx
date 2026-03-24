function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      {/* 🔝 Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🏬 Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">MyStore</h2>
          <p className="text-sm">
            Your one-stop shop for electronics, fashion, and more.
          </p>
        </div>

        {/* 🔗 Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">Email: support@mystore.com</p>
          <p className="text-sm">Phone: +91 8926******</p>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2026 MyStore | All rights reserved
      </div>

    </footer>
  );
}

export default Footer;