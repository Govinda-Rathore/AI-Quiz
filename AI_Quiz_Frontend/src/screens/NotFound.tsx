import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const NotFound = () => {
  const location = useLocation();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true; 
      console.error(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
      toast.error(`Page not found: ${location.pathname}`);
    }
  }, [location.pathname]);
  return (
    <div className="flex min-h-screen items-center justify-centerbg-plum-gradient text-white  bg-gray-100 ">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
