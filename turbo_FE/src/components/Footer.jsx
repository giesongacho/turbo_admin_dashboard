const Footer = () => {
  return (
    <footer
      className="border-gray-200 flex justify-center "
      style={{
        height: '60px', // Fixed height
        minHeight: '60px', // Ensures it doesn't shrink below this
        display: 'flex',
        alignItems: 'center', // Vertically centers content
      }}
    >
      <div className="h-full w-3/4 flex flex-col justify-center items-center mx-5">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <p className="text-gray-600 text-sm">
            © 2025 <span className="font-semibold">TURBO ADMIN</span>. All rights reserved.
          </p>
          {/* <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;