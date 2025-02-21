import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Component() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("currentUserEmail");
  useEffect(() => {
    const userEmail = localStorage.getItem("currentUserEmail");

    if (userEmail) {
      dispatch({ type: "switchLogin", payload: true });
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("switchLogin");
    dispatch({ type: "switchLogin", payload: false });
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link to="#">
              <ShirtIcon className="h-6 w-6" />
              <span className="sr-only">ShadCN</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link to="/dashboard" className="flex w-full items-center py-2 text-lg font-semibold">
                Home
              </Link>
              
              <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold">
                Services
              </Link>
              <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold">
                Portfolio
              </Link>
              <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold">
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link to="#" className="mr-6 hidden lg:flex">
          <ShirtIcon className="h-6 w-6" />
          <span className="sr-only">ShadCN</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to="/dashboard"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Home
              </Link>
            </NavigationMenuLink>
       
            <NavigationMenuLink asChild>
              <Link
                to="/my-listings"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Demande Reservation
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="/my-requests"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Mes Reservations
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="/form"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Add Listing
              </Link>
            </NavigationMenuLink>
            { userEmail == "root@root.com"  && <NavigationMenuLink asChild>
              <Link
                to="/admin"
                className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900  `}
              >
                Admin Panel
              </Link>
            </NavigationMenuLink>}
        
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-2">
          
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      </header>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
