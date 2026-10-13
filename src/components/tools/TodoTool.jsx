import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function TodoTool() {
  const [todos, setTodos] = useLocalStorage('cozy-todos', []);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-cozy-deep flex items-center gap-3">
          <span className="text-3xl">🌿</span> Quest Log
        </h2>
        <span className="text-xs font-bold uppercase tracking-widest text-cozy-sage bg-cozy-sage/20 px-3 py-1 rounded-full">
          {todos.filter(t => !t.completed).length} Left
        </span>
      </div>
      
      <form onSubmit={addTodo} className="flex gap-3 mb-10">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new little quest..."
          className="flex-1 px-6 py-3 rounded-full border-2 border-cozy-sky/30 focus:outline-none focus:border-cozy-terracotta transition-all bg-white/90 placeholder-cozy-sage text-cozy-deep"
        />
        <button 
          type="submit"
          className="bg-cozy-terracotta hover:bg-cozy-terracotta/80 text-white px-6 py-3 rounded-full transition-all active:scale-95 shadow-md font-bold"
        >
          Add
        </button>
      </form>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🍵</div>
            <p className="text-cozy-sage italic text-lg">Your quest log is empty.<br/>Time for a tea break!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border-2 border-transparent hover:border-cozy-sky/50 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed 
                      ? 'bg-cozy-sage border-cozy-sage text-white' 
                      : 'border-cozy-sky/40 hover:border-cozy-terracotta'
                  }`}
                >
                  {todo.completed && '✓'}
                </button>
                <span className={`${todo.completed ? 'line-through text-cozy-sage' : 'text-cozy-deep'} font-medium transition-all`}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-cozy-sage hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
