"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  const username = user?.name || "Admin";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                CeramicHub Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Content Management System
              </p>
            </div>
          </div>

          {/* Right - User Menu */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition"
            >
              <User className="h-4 w-4" />
              {username}
              <ChevronDown
                className={`h-4 w-4 transition ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border bg-background shadow-lg">
                <div className="px-4 py-3 text-sm">
                  <p className="font-medium">{username}</p>
                  <p className="text-muted-foreground">Administrator</p>
                </div>

                <div className="border-t">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
