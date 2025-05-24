import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, Calendar, CheckCircle, List, Trash2 } from 'lucide-react'
import FilterButton from './FilterButton'
import TodoItem from './TodoItem'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  
  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }
  
  // Toggle todo completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  
  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true // 'all' filter
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='backdrop-blur-md bg-black/30 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg border border-white/10'
    >
      <div className='flex items-center justify-center mb-8'>
        <h1 className='text-3xl font-bold text-center text-white tracking-wide'>Todo App</h1>
      </div>
      
      {/* Input area */}
      <div className='flex gap-2 mb-6'>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          className='flex-grow px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500' 
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <motion.button 
          onClick={addTodo} 
          className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={18} />
          <span>Add</span>
        </motion.button>
      </div>

      {/* Filter buttons */}
      <div className='flex justify-center gap-2 mb-4'>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          <List size={14} className="inline mr-1" />
          All
        </FilterButton>
        <FilterButton 
          active={filter === 'active'} 
          onClick={() => setFilter('active')}
        >
          <Calendar size={14} className="inline mr-1" />
          Active
        </FilterButton>
        <FilterButton 
          active={filter === 'completed'} 
          onClick={() => setFilter('completed')}
        >
          <CheckCircle size={14} className="inline mr-1" />
          Completed
        </FilterButton>
      </div>
      
      {/* Todo list */}
      <div className='flex-grow flex flex-col gap-3 overflow-y-auto'>
        <AnimatePresence>
          {filteredTodos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-white/70 text-center mt-10'
            >
              {filter === 'all' 
                ? 'No tasks yet. Add some tasks to get started!' 
                : filter === 'active' 
                  ? 'No active tasks. Great job!' 
                  : 'No completed tasks yet.'}
            </motion.div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Task counter and clear completed */}
      <div className='mt-4 flex justify-between items-center text-sm text-white/70'>
        <span>
          {todos.filter(todo => !todo.completed).length} tasks remaining
        </span>
        {todos.some(todo => todo.completed) && (
          <motion.button
            className='flex items-center gap-1 text-red-400 hover:text-red-300'
            onClick={clearCompleted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={14} />
            Clear completed
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Todo