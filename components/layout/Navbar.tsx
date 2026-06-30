"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CircleUserRound, Home, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { id: "about", label: "About", href: "/about", icon: "" },
    { id: "works", label: "Works", href: "/works", icon: "" },
    { id: "blog", label: "Blog", href: "/blog", icon: "" },
    { id: "contact", label: "Contact", href: "/contact", icon: "" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div
        className="absolute inset-0 backdrop-blur-xs
             mask-[linear-gradient(to_bottom,black_40%,transparent)]"
      ></div>
      <nav className="z-10 bg-background border border-accent rounded-4xl shadow-lg p-2">
        <ul className="flex items-center gap-1">
          {/* Home Icon Link */}
          <li className="border-r border-neutral-700 pr-3 mr-2">
            <Link
              href="/"
              onClick={() => setActiveTab("home")}
              className={`
                relative px-3 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center justify-center
                ${
                  activeTab === "home"
                    ? "text-primary"
                    : "text-primary hover:bg-accent"
                }
              `}
            >
              {activeTab === "home" && (
                <span className="absolute inset-0 bg-accent rounded-full border border-neutral-700 -z-10" />
              )}
              <Home size={20} className="relative z-10" />
            </Link>
          </li>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                  ${
                    activeTab === item.id
                      ? "text-primary"
                      : "text-primary hover:bg-accent"
                  }
                `}
              >
                {activeTab === item.id && (
                  <span className="absolute inset-0 bg-accent rounded-full border border-neutral-700 -z-10" />
                )}
                <span className="relative z-10">{item.label}</span>

              </Link>
            </li>
          ))}

          {/* Dark Mode Toggle */}
          <li className="border-l border-neutral-700 pl-3 ml-2">
            <button
              onClick={toggleDarkMode}
              className="relative px-3 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ease-in-out flex items-center justify-center text-primary hover:bg-accent"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="relative z-10" />
              ) : (
                <Moon size={20} className="relative z-10" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
