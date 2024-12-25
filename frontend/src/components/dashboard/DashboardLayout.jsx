import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, UserCircle, LogOut, Menu } from 'lucide-react';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static absolute z-30`}>
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-primary-600">TaskMaster</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-task" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Task</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              {/* <div className="text-xl font-semibold text-gray-800">Dashboard</div> */}
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

