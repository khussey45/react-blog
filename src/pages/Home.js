// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ scale: 0 }}  // Initially scale down to 0
        animate={{ scale: 1 }}  // Animate to scale up to 1
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to My Portfolio</h2>
        <p className="text-gray-700 mb-4">
          Explore my projects, learn more about me, and get in touch!
        </p>
        <a
          href="/projects"
          className="text-white bg-blue-500 px-4 py-2 rounded-full"
        >
          View Projects
        </a>
      </motion.div>
    </div>
  );
}

export default Home;
