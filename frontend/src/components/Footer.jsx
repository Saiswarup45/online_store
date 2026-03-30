import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div>
          <h2 className="text-xl font-bold">MyStore</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Your one-stop shop for all products.
          </p>
        </div>

        

        
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">support@saistore.com</p>
        </div>

      </div>

    
      <div className="text-center text-gray-500 text-sm pb-4">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;