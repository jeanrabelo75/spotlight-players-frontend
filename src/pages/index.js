import Link from "next/link";
import React, { useState } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">Your Startup</div>
        <div className="hidden md:flex space-x-4">
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
          <button onClick={() => scrollToSection("pricing")}>Pricing</button>
          <Link href="/login">
            <span className="bg-white text-primary px-4 py-2 rounded">
              Login
            </span>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gray-100 p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Startup</h1>
        <p className="text-lg mb-8">Revolutionizing the way you do things</p>
        <button className="bg-primary text-white px-6 py-3 rounded-full">
          Get Started
        </button>
      </section>

      {/* About Us Section */}
      <section id="about" className="p-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            We are on a mission to change the world, one step at a time.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">Have questions? Get in touch with us!</p>
        <button className="bg-primary text-white px-6 py-3 rounded-full">
          Contact Us
        </button>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <p className="text-lg mb-8">
          Check out our flexible pricing plans to fit your needs.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-full">
          View Pricing
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 Your Startup</p>
      </footer>

      {/* Menu Lateral */}
      {isMenuOpen && (
        <aside className="bg-primary text-white p-4 fixed inset-0 md:hidden">
          <div className="flex justify-end mb-4">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
            <button onClick={() => scrollToSection("pricing")}>Pricing</button>
            <Link href="/login">
              <span>Login</span>
            </Link>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Home;
