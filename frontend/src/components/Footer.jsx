import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">TaskMaster</h3>
            <p className="text-gray-400">Streamline your productivity with our intuitive task management application.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-400">
              <li><a href="#" className="hover:text-white transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Features</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <ul className="text-gray-400">
            <li><a href="https://www.linkedin.com/in/shresth-kaushik-95b624234/" className="hover:text-white transition duration-300">LinkedIn</a></li>
              <li><a href="https://github.com/Shresth-kaushik" className="hover:text-white transition duration-300">Github</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

