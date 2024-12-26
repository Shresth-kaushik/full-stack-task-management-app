import React, { useState } from 'react';
import axios from 'axios';

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post('https://full-stack-task-management-app.onrender.com/api/tasks', 
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full p-2 mb-2 bg-secondary rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 mb-2 bg-secondary rounded"
      />
      <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;

