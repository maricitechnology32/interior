 

// import React from 'react';
// import { useInView } from 'react-intersection-observer';

// const FeatureCard = ({ icon, title, children, className = '', delay = 0 }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <div
//       ref={ref}
//       className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl ${className} ${
//         inView
//           ? 'opacity-100 translate-y-0 scale-100'
//           : 'opacity-0 translate-y-10 scale-95'
//       }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {/* Animated background gradient on hover */}
//       <div className="absolute inset-0 bg-to-br from-blue-50 via-white to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
//       {/* Floating animation element */}
//       <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"></div>
      
//       {/* Animated border gradient */}
//       <div className="absolute inset-0 rounded-2xl bg-to-r from-blue-400 via-purple-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
//       <div className="absolute inset-px rounded-2xl bg-white -z-10"></div>

//       <div className="relative z-10">
//         {/* Icon container with enhanced animation */}
//         <div className="relative">
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:from-purple-600 group-hover:to-blue-500">
//             <div className="transition-transform duration-500 group-hover:scale-110">
//               {icon}
//             </div>
//           </div>
          
//           {/* Pulsing effect behind icon */}
//           <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-blue-200 opacity-0 group-hover:opacity-40 group-hover:scale-125 transition-all duration-1000 animate-pulse"></div>
//         </div>

//         {/* Title with gradient text on hover */}
//         <h3 className="mt-6 text-xl font-bold text-gray-900 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-to-r group-hover:from-blue-600 group-hover:to-purple-600">
//           {title}
//         </h3>

//         {/* Content with enhanced typography */}
//         <p className="mt-4 text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-gray-700">
//           {children}
//         </p>

//         {/* Animated read more indicator */}
//         <div className="mt-6 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
//           <span className="text-sm font-semibold">Learn more</span>
//           <svg 
//             className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M9 5l7 7-7 7" 
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Shine effect on hover */}
//       <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/50 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//     </div>
//   );
// };

// export default FeatureCard;

import { useInView } from 'react-intersection-observer';

const FeatureCard = ({ icon, title, children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F5F4F0] p-8 shadow-lg transition-all duration-500 hover:shadow-2xl ${className} ${
        inView
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-[#D1B68A]/10 via-[#F5F4F0] to-[#D1B68A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating animation element */}
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-linear-to-r from-[#D1B68A] to-[#3A5A5C] opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150"></div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#D1B68A] via-[#3A5A5C] to-[#D1B68A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      <div className="absolute inset-px rounded-2xl bg-[#F5F4F0] -z-10"></div>

      <div className="relative z-10">
        {/* Icon container with enhanced animation */}
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D1B68A] text-[#333333] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#3A5A5C] group-hover:text-[#F5F4F0]">
            <div className="transition-transform duration-500 group-hover:scale-110">
              {icon}
            </div>
          </div>
          
          {/* Pulsing effect behind icon */}
          <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-[#D1B68A] opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-1000 animate-pulse"></div>
        </div>

        {/* Title with gradient text on hover */}
        <h3 className="mt-6 text-xl font-bold text-[#333333] transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3A5A5C] group-hover:to-[#b58e5a]">
          {title}
        </h3>

        {/* Content with enhanced typography */}
        <p className="mt-4 text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-gray-700">
          {children}
        </p>

        {/* Animated read more indicator */}
        <div className="mt-6 flex items-center text-[#3A5A5C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <span className="text-sm font-semibold">Learn more</span>
          <svg 
            className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};

export default FeatureCard;