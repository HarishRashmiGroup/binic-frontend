import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Facebook, Twitter, Instagram, Linkedin, Brain, Lock, Code, BookOpen, Calculator, Atom, Microscope, PenBox, User2Icon, User2, CircleOff } from 'lucide-react';
import SuccessStories from './SuccessStories';
import { useNavigate } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            We are committed to delivering quality products and services. Our team works hard to ensure customer satisfaction.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 Bionic Intelligence. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
export const Header = ({ userName }) => (
  <div className="flex justify-between items-center p-4 bg-slate-800 text-white">
    <div className="flex items-center gap-2" >
      <Brain size={32} className="text-blue-400" />
      <span className="text-2xl font-bold">Bionic Intelligence</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm">Welcome, {userName}</span>
      <User2 className="border rounded-md p-1" />
    </div>
  </div>
);

const SubjectCard = ({ title, icon: Icon, color, onClick, isActive }) => (
  <div className="relative">
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={isActive ? onClick : null}
    >
      <CardHeader className="space-y-1">
        <Icon size={24} className={`${color}`} />
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Explore {title.toLowerCase()} concepts and exercises</p>
      </CardContent>
    </Card>
    {!isActive && (
      <div className="absolute top-0 right-0">
        <div className="group relative">
          <div className="w-5 h-5 rounded-full cursor-not-allowed m-2"><CircleOff className='w-full' /></div>
          <div className="absolute bottom-6 left-1/2 w-[80px] transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
            Not eligible
          </div>
        </div>
      </div>
    )}
  </div>

);

const SecuritySetup = ({ onComplete, courseUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [securitySteps, setSecuritySteps] = useState([
    { id: 1, text: 'Verifying user credentials', completed: false },
    { id: 2, text: 'Checking system compatibility', completed: false },
    { id: 3, text: 'Preparing secure connection', completed: false }
  ]);

  useEffect(() => {
    const simulateSecurityCheck = async () => {
      for (let i = 0; i < securitySteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSecuritySteps(prev => 
          prev.map((step, index) => 
            index <= i ? { ...step, completed: true } : step
          )
        );
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setIsLoading(false);
            onComplete();
          },
          () => {
            alert('Location access is recommended for enhanced security');
            setIsLoading(false);
            onComplete();
          }
        );
      } else {
        setIsLoading(false);
        onComplete();
      }
    };

    simulateSecurityCheck();
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-800 flex flex-col items-center justify-center text-white">
      <Lock size={64} className="mb-8 animate-pulse" />
      <h2 className="text-2xl mb-4">Securing Your Access</h2>
      <div className="space-y-4">
        {securitySteps.map(step => (
          <div key={step.id} className="flex items-center space-x-4">
            {step.completed ? (
              <span className="text-green-500">✓</span>
            ) : (
              <span className="animate-spin">🔄</span>
            )}
            <span>{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [eligibleCourse, setEligibleCourse] = useState('');
  const [courseUrl, setCourseUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSecuritySetup, setShowSecuritySetup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await fetch('https://bionic-backend-7v9q.onrender.com/users/basic', {
        // const response = await fetch('http://localhost:3001/users/basic', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setUserName(data.name);
        setEligibleCourse(data.eligibleCourse);
        setCourseUrl(data.courseUrl);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleCardClick = () => {
    setShowSecuritySetup(true);
  };

  const handleSecurityComplete = () => {
    window.location.href = courseUrl;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin">🔄</div>
      </div>
    );
  }

  if (showSecuritySetup) {
    return <SecuritySetup onComplete={handleSecurityComplete} courseUrl={courseUrl} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName={userName} />
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <SubjectCard
            title="Coding"
            icon={Code}
            color="text-green-500"
            isActive={eligibleCourse === 'coding'}
            onClick={() => handleCardClick()}
          />
          <SubjectCard
            title="English"
            icon={BookOpen}
            color="text-blue-500"
            isActive={eligibleCourse === 'english'}
            onClick={() => handleCardClick()}
          />
          <SubjectCard
            title="Mathematics"
            icon={Calculator}
            color="text-purple-500"
            isActive={eligibleCourse === 'mathematics'}
            onClick={() => handleCardClick()}
          />
          <SubjectCard
            title="Physics"
            icon={Atom}
            color="text-red-500"
            isActive={eligibleCourse === 'physics'}
            onClick={() => handleCardClick()}
          />
          <SubjectCard
            title="Hindi"
            icon={PenBox}
            color="text-blue-500"
            isActive={eligibleCourse === 'hindi'}
            onClick={() => handleCardClick()}
          />
          <SubjectCard
            title="Biology"
            icon={Microscope}
            color="text-blue-500"
            isActive={eligibleCourse === 'biology'}
            onClick={() => handleCardClick()}
          />
        </div>
      </main>
      <SuccessStories />
      <Footer />
    </div>
  );
};

export default Dashboard;