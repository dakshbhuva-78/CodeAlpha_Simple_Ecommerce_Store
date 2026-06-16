function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          CodeAlpha Store
        </h1>

        <div className="flex gap-6">
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