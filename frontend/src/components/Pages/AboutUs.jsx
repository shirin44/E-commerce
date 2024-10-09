import React from 'react';
import blossomLogo from '/Users/shirinshujaa/Desktop/E-commerce/frontend/src/components/Images/blossom-logo.jpg'; // Import the logo
import Header from '../Layout/Header'; // Import the Header component

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Display the Header at the top */}
      
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-50 p-6">
        <img
          src={blossomLogo}
          alt="Blossom Touch Logo"
          className="w-32 h-32 mb-6 rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold text-pink-500 mb-6">About Blossom Touch</h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mb-4">
          Welcome to Blossom Touch, your go-to souvenir shop based in the heart of Damascus, Syria.
          We offer a wide range of unique souvenirs, perfect for capturing the essence of your occasion.
        </p>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-pink-500 mb-2">Location</h2>
          <p className="text-lg text-gray-700 mb-6">📍 Damascus, Syria</p>

          <h2 className="text-2xl font-semibold text-pink-500 mb-2">How to Order</h2>
          <p className="text-lg text-gray-700 mb-4">
            Simply DM us on Instagram to place your order 💌
          </p>

          <a
            href="https://www.instagram.com/blossomtouch.rl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-pink-500 hover:underline"
          >
            Visit our Instagram: @blossomtouch.rl
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
