import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // Only scroll to top when pathname changes (not when query params change)
    if (prevPathnameRef.current !== pathname) {
      // Check if this is a back navigation (flag set by ProductDetail)
      const isBackNavigation = sessionStorage.getItem(`back-nav-${pathname}`);
      
      if (isBackNavigation) {
        // This is a back navigation - don't scroll, let ProductGrid restore scroll
        // Remove the flag so next navigation will scroll to top
        sessionStorage.removeItem(`back-nav-${pathname}`);
      } else {
        // This is a new navigation - scroll to top and clear any saved scroll
        sessionStorage.removeItem(`scroll-${pathname}`);
        
        // Force scroll to top with multiple attempts
        const scrollToTop = () => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        };
        
        // Immediate scroll
        scrollToTop();
        
        // After a short delay
        setTimeout(scrollToTop, 0);
        
        // After requestAnimationFrame
        requestAnimationFrame(() => {
          scrollToTop();
        });
        
        // After a longer delay to ensure DOM is ready
        setTimeout(scrollToTop, 50);
        setTimeout(scrollToTop, 100);
      }
      
      prevPathnameRef.current = pathname;
    }
  }, [pathname]); // Only depend on pathname, not search params

  return null;
};

export default ScrollToTop;

