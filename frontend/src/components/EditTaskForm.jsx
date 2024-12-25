import React, { useState } from 'react';
import axios from 'axios';

function EditTaskForm({ task, onTaskUpdated, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.put(`http://localhost:5002/api/tasks/${task._id}`,
        { title, description, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full p-2 bg-secondary rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 bg-secondary rounded"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          id="status"
          className="form-checkbox"
        />
        <label htmlFor="status">Completed</label>
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
          Update Task
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;

