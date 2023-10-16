import React from "react";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Your Startup</div>
          <nav className="space-x-4">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
            <button onClick={() => scrollToSection("pricing")}>Pricing</button>
            <Link href="/login">
              <span className="bg-white text-blue-500 px-4 py-2 rounded">
                Login
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gray-100 p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Startup</h1>
        <p className="text-lg mb-8">Revolutionizing the way you do things</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full">
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
          {/* <Image
            src="/about-image.jpg"
            alt="About Us"
            className="mx-auto rounded-full"
            width={800}
            height={400}
          /> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">Have questions? Get in touch with us!</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full">
          Contact Us
        </button>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <p className="text-lg mb-8">
          Check out our flexible pricing plans to fit your needs.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full">
          View Pricing
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 Your Startup</p>
      </footer>
    </div>
  );
};

export default LandingPage;
