import React from 'react';
import { 
  Users, 
  Wand2, 
  FileDown, 
  Palette, 
  Lock, 
  Zap
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors text-blue-600 group-hover:text-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, seeing changes as they happen."
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Hand-drawn Style",
      description: "Create diagrams that look hand-drawn, giving a more human and approachable feel."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Customizable",
      description: "Change colors, line styles, and more to match your brand or preferences."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightweight & Fast",
      description: "Loads quickly and runs smoothly, even with complex diagrams and multiple collaborators."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Powerful Features for Effective Visualization
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to create beautiful diagrams and collaborate seamlessly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;