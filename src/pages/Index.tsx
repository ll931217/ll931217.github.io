
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/home/SkillsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import RecentPosts from '@/components/blog/RecentPosts';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <SkillsSection />
      <FeaturedProjects />
      <RecentPosts />
    </Layout>
  );
};

export default Index;
