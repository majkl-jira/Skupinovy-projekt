function Header() {
    return (
      <header className="bg-[#3C3B6E] text-white w-full shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">Blogly</h1>
            <nav className="flex divide-x divide-[#B22234]">
              <Link
                to="/"
                className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
              >
                Home
              </Link>
              <Link
                to="/o-autorovi"
                className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
              >
                O autorovi
              </Link>
              <Link
                to="/recenze"
                className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
              >
                Recenze
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }