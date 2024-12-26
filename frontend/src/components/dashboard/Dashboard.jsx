import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Pencil, Trash2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: false
  });

  useEffect(() => {
    fetchTasks();
  }, [search, status, currentPage, sortBy, sortOrder]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://full-stack-task-management-app.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { search, status, page: currentPage, sortBy, sortOrder }
      });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setLoading(false);
    }
  };


  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  const handleUpdate = async (taskId) => {
    try {
      await axios.put(
        `https://full-stack-task-management-app.onrender.com/api/tasks/${taskId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`https://full-stack-task-management-app.onrender.com/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="sr-only">Search tasks</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Search tasks..."
              value={search}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="status" className="sr-only">Filter by status</label>
          <div className="relative">
            <select
              id="status"
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              value={status}
              onChange={handleStatusFilter}
            >
              <option value="">All tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => handleSort('title')}
          className={`mr-4 ${sortBy === 'title' ? 'text-primary-600 font-semibold' : 'text-gray-600'}`}
        >
          Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('createdAt')}
          className={`mr-4 ${sortBy === 'createdAt' ? 'text-primary-600 font-semibold' : 'text-gray-600'}`}
        >
          Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('status')}
          className={`${sortBy === 'status' ? 'text-primary-600 font-semibold' : 'text-gray-600'}`}
        >
          Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Tasks List */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-500">Loading tasks...</p>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-280px)]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto flex-grow"
          >
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                variants={item}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-[250px] flex flex-col"
              >
                {editingTask === task._id ? (
                  <div className="p-6 flex flex-col h-full">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow mb-4 resize-none"
                    />
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.checked })}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="text-sm text-gray-600">Mark as completed</label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingTask(null)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full p-6">
                    <div className="flex-grow overflow-auto">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">{task.title}</h3>
                          <p className="text-gray-600 break-words whitespace-pre-wrap overflow-auto">{task.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {task.status ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <Clock className="h-6 w-6 text-primary-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            task.status
                              ? 'bg-green-100 text-green-800'
                              : 'bg-primary-100 text-primary-800'
                          }`}>
                            {task.status ? 'Completed' : 'In Progress'}
                          </span>
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Edit task"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          
          {/* Pagination */}
          <div className="py-4 border-t mt-4">
            <nav className="flex justify-center" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === page + 1
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

