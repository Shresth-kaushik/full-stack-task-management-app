import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import Footer from './Footer';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://full-stack-task-management-app.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://full-stack-task-management-app.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">TaskMaster</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <AddTaskForm onTaskAdded={fetchTasks} />
        <ul className="mt-8 space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="bg-white p-6 rounded-lg shadow-md">
              {editingTask === task._id ? (
                <EditTaskForm
                  task={task}
                  onTaskUpdated={() => {
                    setEditingTask(null);
                    fetchTasks();
                  }}
                  onCancel={() => setEditingTask(null)}
                />
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Status: {task.status ? 'Completed' : 'Pending'}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditingTask(task._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default TaskList;

