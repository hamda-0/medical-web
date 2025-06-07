'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/reducers/theme/themeReducer';
import Link from 'next/link';
import { logout } from '@/reducers/auth/authReducer';
import Logo from '../common/Logo';
import { usePathname } from 'next/navigation';
import NavTabs from './NavTabs';
import { navigationLinks } from '@/constants/navigationLinks';
import LoginButton from '../LoginButton';
import RegisterButton from '../RegisterButton';

const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle('dark');
  };

  const handleMobileDropdownToggle = (dropdownName: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === dropdownName ? null : dropdownName);
  };

 

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const isActiveDropdown = (items: { href: string; label: string }[]) => {
    return items.some(item => pathname === item.href);
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation - Using shadcn NavigationMenu */}
        <div className="hidden md:flex">
          <NavTabs />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="h-9 w-9 p-0"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="size-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <LoginButton/>
              <RegisterButton/>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-9 w-9 p-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container px-4 py-4 space-y-4">
            {navigationLinks.map((navItem, index) => (
              <div key={index}>
                {navItem.type === 'link' ? (
                  <Link
                    href={navItem.href!}
                    className={`block transition-colors hover:bg-gray-50 p-2 rounded-md ${
                      isActiveLink(navItem.href!) 
                        ? 'text-primary bg-accent' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {navItem.label}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMobileDropdownToggle(navItem.label)}
                      className={`flex items-center justify-between w-full transition-colors hover:bg-gray-50 p-2 rounded-md ${
                        isActiveDropdown(navItem.items!) 
                          ? 'text-primary bg-accent' 
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {navItem.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileActiveDropdown === navItem.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileActiveDropdown === navItem.label && (
                      <div className="ml-4 space-y-1">
                        {navItem.items!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block text-sm transition-colors hover:bg-gray-50 p-2 rounded-md ${
                              isActiveLink(item.href) 
                                ? 'text-primary bg-accent' 
                                : 'text-muted-foreground hover:text-primary'
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileActiveDropdown(null);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeToggle}
                className="h-9 w-9 p-0"
              >
                {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.firstName}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="size-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                 <LoginButton/>
                 <RegisterButton/>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;