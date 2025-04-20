import React from 'react';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Digital Lab Space
            </span>
            <br />
            <span className="text-gray-800">For Infinite Possibilities</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform ideas into reality with CoLab - where teams collaborate, innovate, and create in real-time virtual workspaces.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href='/signin'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors text-lg w-full sm:w-auto'>
                Start Collaborating
              </button>
            </Link>
          </div>
        </div>
        
        <div className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-w-5xl mx-auto">
          <div className="bg-white p-3">
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="aspect-video bg-gray-50 rounded relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration in action" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;