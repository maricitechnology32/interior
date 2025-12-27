

import React, { useEffect, useState } from 'react';

// Import all our homepage sections
import HeroSection from '../components/HeroSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import WorkingProcess from '../components/WorkingProcess';
import TestimonialSlider from '../components/TestimonialSlider';
import BlogPreview from '../components/BlogPreview';
import InquiryForm from '../components/InquiryForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/apiSlice';

import sketchBefore from '../assets/sketch-before.png';
import renderAfter from '../assets/render-after.png';

const HomePage = () => {
  const { isAdmin } = useAuth();
  const [transformation, setTransformation] = useState(null);

  useEffect(() => {
    const fetchActiveTransformation = async () => {
      try {
        const { data } = await api.get('/transformations/active');
        if (data) setTransformation(data);
      } catch (err) {
        console.error('Failed to fetch transformation:', err);
      }
    };
    fetchActiveTransformation();
  }, []);

  return (
    // We remove the default padding `p-4` to allow sections
    // to control their own background colors and padding.
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 1.5 Transformation Showcase */}
      {transformation ? (
        <BeforeAfterSlider
          beforeImage={transformation.beforeImage.url}
          afterImage={transformation.afterImage.url}
          title={transformation.title}
          description={transformation.description}
        />
      ) : (
        /* Fallback / Default */
        <BeforeAfterSlider
          beforeImage={sketchBefore}
          afterImage={renderAfter}
          title="From Sketch to Reality"
          description="Experience our meticulous planning process. Slide to see how we transform initial concept sketches into breathtaking living realities."
        />
      )}

      {/* 2. Services Preview */}
      <ServicesPreview />

      {/* 3. Projects Preview */}
      <ProjectsPreview />

      {/* 4. Working Process */}
      <WorkingProcess />

      {/* 5. Testimonials */}
      <TestimonialSlider />

      {/* 6. Blog Preview */}
      <BlogPreview />

      {/* 7. Inquiry Form - Hidden for Admin */}
      {!isAdmin && (
        <InquiryForm />
      )}
    </div>
  );
};

export default HomePage;