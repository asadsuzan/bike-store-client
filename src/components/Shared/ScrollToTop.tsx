import  { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Disable browser's scroll restoration
    window.scrollTo(0, 0); // Reset scroll position to the top
  }, [pathname]);

  return null;
};

export default ScrollToTop;