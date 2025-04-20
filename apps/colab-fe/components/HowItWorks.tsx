import React from 'react';
import { Check } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Create a New Lab",
      description: "Start with a blank canvas or choose from our templates to kickstart your project.",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      number: 2,
      title: "Invite Your Team",
      description: "Share a link with your team to collaborate in real-time on the same workspace.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      number: 3,
      title: "Create Together",
      description: "Use our intuitive tools to brainstorm, design, and innovate as a team.",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            How CoLab Works
          </h2>
          <p className="text-xl text-gray-600">
            Get started in minutes with our simple process.
          </p>
        </div>
        
        <div className="space-y-24 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="mt-1 text-green-500">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-gray-600">
                        {index === 0 && item === 1 && "Choose from 50+ built-in templates"}
                        {index === 0 && item === 2 && "Customize canvas size and background"}
                        {index === 0 && item === 3 && "Start from scratch with a blank canvas"}
                        
                        {index === 1 && item === 1 && "Simple link sharing with access controls"}
                        {index === 1 && item === 2 && "Up to 50 simultaneous collaborators"}
                        {index === 1 && item === 3 && "See who's viewing and editing in real-time"}
                        
                        {index === 2 && item === 1 && "Intuitive drawing tools and shapes library"}
                        {index === 2 && item === 2 && "Smart connectors and alignment guides"}
                        {index === 2 && item === 3 && "Add text, sticky notes, and comments"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;