import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Welcome to TaskMaster</h1>
                <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
                  Streamline your productivity with our intuitive task management application.
                </p>
                <Link
                  to="/signup"
                  className="bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-100 transition duration-300 transform hover:scale-105 inline-block animate-fade-in-up animation-delay-400"
                >
                  Get Started
                </Link>
              </div>
              <div className="w-full lg:w-1/2 animate-fade-in-up animation-delay-600">
                <div className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <img
                    src="/images/landingPage.jpg"
                    alt="TaskMaster Dashboard"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Organize Tasks"
                description="Create, edit, and delete tasks with ease. Keep your projects on track."
                icon="📋"
              />
              <FeatureCard
                title="Track Progress"
                description="Mark tasks as complete and visualize your productivity over time."
                icon="📊"
              />
              <FeatureCard
                title="Collaborate"
                description="Share tasks and projects with team members for seamless cooperation."
                icon="👥"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">How It Works</h2>
            <div className="flex flex-wrap justify-center items-center">
              <StepCard number={1} title="Sign Up" description="Create your account and get started in minutes." />
              <StepCard number={2} title="Add Tasks" description="Easily add and organize your tasks and projects." />
              <StepCard number={3} title="Track Progress" description="Monitor your progress and celebrate your achievements." />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">Ready to boost your productivity?</h2>
            <Link
              to="/signup"
              className="bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-100 transition duration-300 transform hover:scale-105 inline-block animate-pulse"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 animate-fade-in-up">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 animate-fade-in-up">
        <div className="text-3xl font-bold text-primary-600 mb-4">{number}</div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default LandingPage;

