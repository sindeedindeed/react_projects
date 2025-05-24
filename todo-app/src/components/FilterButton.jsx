import React from 'react';
import { motion } from 'framer-motion';

const FilterButton = ({ active, onClick, children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
        active
          ? 'bg-purple-600 text-white'
          : 'bg-white/10 text-white/70 hover:bg-white/20'
      }`}
    >
      {children}
    </motion.button>
  );
};

export default FilterButton;