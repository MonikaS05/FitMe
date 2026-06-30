// src/components/Features.jsx

import React from 'react';
import FeatureCard from './FeatureCard';
import { Ruler, Camera, Shirt, Map } from 'lucide-react'; // We'll use these icons

// Data for our features, based on your project script
const featuresData = [
  {
    icon: <Ruler size={32} className="text-emerald-500" />,
    title: 'Fabric Estimator',
    description: 'Estimate fabric needed with manual measurements or just a photo.'
  },
  {
    icon: <Camera size={32} className="text-emerald-500" />,
    title: 'Virtual Trial Room',
    description: 'Try on different outfits on your photo before you decide to stitch.'
  },
  {
    icon: <Shirt size={32} className="text-emerald-500" />,
    title: 'Outfit Recommendation',
    description: 'Get outfit suggestions based on the occasion, season, and your style.'
  },
  {
    icon: <Map size={32} className="text-emerald-500" />,
    title: 'Explore by State',
    description: 'Discover and try on traditional attire from every state in India.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">A Smarter Way to Style</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">All the tools you need for a perfect wardrobe.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
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