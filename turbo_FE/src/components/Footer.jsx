const Footer = () => {
  return (
    <footer
      className="bg-white bg-red-500 border-gray-200 w-full"
      style={{
        height: '60px', // Fixed height
        minHeight: '60px', // Ensures it doesn't shrink below this
        display: 'flex',
        alignItems: 'center', // Vertically centers content
        width: '100%', // Ensures full width
      }}
    >
      <div className="px-6 py-2 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 <span className="font-semibold">TURBO ADMIN</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;