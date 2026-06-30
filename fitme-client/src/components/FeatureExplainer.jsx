// src/components/FeatureExplainer.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';

// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// 3. Import your icons and new images
import { Ruler, Camera, Shirt, Map, Sparkles, ArrowRight } from 'lucide-react';
import estimatorImg from '../assets/feature-estimator.png';
import vtrImg from '../assets/feature-vtr.png';
import recommendImg from '../assets/feature-recommend.png';
import exploreImg from '../assets/feature-explore.png';

// 4. Create an expanded data array with more details and images
const featuresData = [
  {
    icon: <Ruler size={32} />,
    title: 'Fabric Estimator',
    description: 'No more guesswork. Input your measurements or upload a photo, and our smart algorithm will tell you exactly how much fabric you need for any garment type.',
    image: estimatorImg,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    bgGlow: 'bg-purple-500/20'
  },
  {
    icon: <Camera size={32} />,
    title: 'Virtual Trial Room',
    description: 'See it before you sew it. Upload your picture, choose from endless outfit styles, and see how they look on you instantly. Download and share your new look!',
    image: vtrImg,
    gradient: 'from-pink-500 via-rose-500 to-amber-500',
    bgGlow: 'bg-pink-500/20'
  },
  {
    icon: <Shirt size={32} />,
    title: 'Outfit Recommendation',
    description: 'Your personal stylist is here. Tell us the occasion, season, and your preferences, and get curated outfit recommendations that match your taste.',
    image: recommendImg,
    gradient: 'from-amber-500 via-orange-500 to-pink-500',
    bgGlow: 'bg-amber-500/20'
  },
  {
    icon: <Map size={32} />,
    title: 'Explore by State',
    description: 'Take a cultural tour of India through fashion. Discover, learn about, and virtually try on beautiful traditional attire from every corner of the country.',
    image: exploreImg,
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    bgGlow: 'bg-indigo-500/20'
  }
];

const FeatureExplainer = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/login');
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header with Fancy Typography */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-6">
            <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Discover Our Magic</span>
          </div>

          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              How FitMe
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Experience the future of fashion with our <span className="text-purple-600 dark:text-purple-400 font-semibold">AI-powered features</span>
          </p>
        </div>

        {/* Swiper component */}
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="feature-swiper"
        >
          {featuresData.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
                
                {/* Text Content - alternates sides */}
                <div className={`text-center lg:text-left ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl shadow-purple-500/30 mb-6 transform hover:scale-110 hover:rotate-3 transition-all duration-300`}>
                    {React.cloneElement(feature.icon, {
                      className: "text-white",
                      strokeWidth: 2.5
                    })}
                  </div>

                  {/* Title with Fancy Font */}
                  <h3 
                    className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-8"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {feature.description}
                  </p>

                  {/* Try Now Button with Gradient */}
                  <button
                    onClick={handleTryNow}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 hover:from-purple-700 hover:via-pink-600 hover:to-amber-600 text-white font-bold rounded-full text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Try Now
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  </button>
                </div>

                {/* Image - alternates sides with fancy effects */}
                <div className={`flex justify-center ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group">
                    {/* Glow effect behind image */}
                    <div className={`absolute -inset-4 ${feature.bgGlow} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Gradient border effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500`}></div>
                    
                    {/* Image container */}
                    <div className="relative bg-white dark:bg-gray-800 p-2 rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="rounded-2xl max-h-[400px] w-full object-cover shadow-xl"
                      />
                      
                      {/* Overlay gradient on hover */}
                      <div className={`absolute inset-2 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>

                    {/* Decorative sparkle */}
                    <div className="absolute -top-2 -right-2 w-8 h-8">
                      <Sparkles className="text-amber-400 animate-pulse" size={24} />
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Decorative bottom element */}
        <div className="mt-16 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        /* Custom Swiper Navigation Arrows */
        .feature-swiper :global(.swiper-button-next),
        .feature-swiper :global(.swiper-button-prev) {
          background: linear-gradient(135deg, #9333ea, #ec4899);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(147, 51, 234, 0.3);
          transition: all 0.3s ease;
        }

        .feature-swiper :global(.swiper-button-next:hover),
        .feature-swiper :global(.swiper-button-prev:hover) {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(147, 51, 234, 0.5);
        }

        .feature-swiper :global(.swiper-button-next::after),
        .feature-swiper :global(.swiper-button-prev::after) {
          font-size: 20px;
          font-weight: bold;
          color: white;
        }

        @media (max-width: 768px) {
          .feature-swiper :global(.swiper-button-next),
          .feature-swiper :global(.swiper-button-prev) {
            width: 40px;
            height: 40px;
          }
          
          .feature-swiper :global(.swiper-button-next::after),
          .feature-swiper :global(.swiper-button-prev::after) {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureExplainer;