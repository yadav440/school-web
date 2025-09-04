import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'administrator', userName = 'John Doe' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/administrator-dashboard', 
      icon: 'LayoutDashboard',
      roles: ['administrator', 'teacher', 'student']
    },
    { 
      label: 'Students', 
      path: '/student-management', 
      icon: 'Users',
      roles: ['administrator']
    },
    { 
      label: 'Teachers', 
      path: '/teacher-dashboard', 
      icon: 'GraduationCap',
      roles: ['administrator', 'teacher']
    },
    { 
      label: 'Grades', 
      path: '/grade-book', 
      icon: 'BookOpen',
      roles: ['administrator', 'teacher']
    },
    { 
      label: 'Portal', 
      path: '/student-portal', 
      icon: 'User',
      roles: ['student']
    }
  ];

  const moreItems = [
    { label: 'Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Admin', icon: 'Shield', action: () => console.log('Admin'), roles: ['administrator'] }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  )?.slice(0, 4);

  const filteredMoreItems = moreItems?.filter(item => 
    !item?.roles || item?.roles?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-foreground">SchoolHub</h1>
            <span className="text-xs text-muted-foreground">Education Management</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2"
            >
              {item?.label}
            </Button>
          ))}
          
          {/* More Menu */}
          {filteredMoreItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                iconName="MoreHorizontal"
                iconSize={18}
                className="px-3 py-2"
              >
                More
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-3 animate-fadeIn">
                  {filteredMoreItems?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item?.action();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User Profile & Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName="Menu"
            iconSize={20}
            className="lg:hidden p-2"
          />

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-3 animate-fadeIn">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
                <button
                  onClick={() => {
                    console.log('Profile');
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="User" size={16} className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="LogOut" size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevation-2 animate-fadeIn">
          <nav className="px-6 py-4 space-y-2">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full px-4 py-3 rounded-md text-left transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} className="mr-3" />
                {item?.label}
              </button>
            ))}
            
            {filteredMoreItems?.length > 0 && (
              <>
                <div className="border-t border-border my-2"></div>
                {filteredMoreItems?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item?.action();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-md text-left text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={item?.icon} size={18} className="mr-3" />
                    {item?.label}
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;