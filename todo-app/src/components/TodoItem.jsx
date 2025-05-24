import React from 'react';
import { motion } from 'framer-motion';
import deleteIcon from '../assets/delete.png';
import notTickIcon from '../assets/not_tick.png';
import tickIcon from '../assets/tick.png';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center p-3 rounded-lg ${
        todo.completed
          ? 'bg-green-900/20 border border-green-500/30'
          : 'bg-white/10 border border-white/20'
      }`}
    >
      <motion.img
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        src={todo.completed ? tickIcon : notTickIcon}
        alt={todo.completed ? 'Completed' : 'Not completed'}
        className="w-6 h-6 cursor-pointer mr-3"
        onClick={() => toggleComplete(todo.id)}
      />
      <span
        className={`flex-grow ${
          todo.completed ? 'line-through text-green-400' : 'text-white'
        }`}
      >
        {todo.text}
      </span>
      <motion.img
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        src={deleteIcon}
        alt="Delete"
        className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
        onClick={() => deleteTodo(todo.id)}
      />
    </motion.div>
  );
};

export default TodoItem;