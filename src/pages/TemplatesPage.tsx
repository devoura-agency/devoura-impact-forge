import Templates from '../components/Templates';
import { motion } from 'framer-motion';

const TemplatesPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-start pt-24 pb-16"
    >
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-8 text-center">
          Choose Your Perfect Template
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          Browse our professionally designed templates, preview them in real time, and select the one that fits your mission best. Each template is crafted for impact, engagement, and ease of use.
        </p>
        <Templates showPageMode />
      </div>
    </motion.main>
  );
};

export default TemplatesPage; 