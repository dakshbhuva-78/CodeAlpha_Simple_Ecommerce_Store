function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">
          AppleStore
        </h1>

        <div className="flex gap-8 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Login</a>
          <a href="#">Cart</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;