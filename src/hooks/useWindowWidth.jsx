import { useEffect, useState } from 'react';

export default function useWindowWidth() {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      let timeoutId

      const handleResize = () => {
         clearTimeout(timeoutId)
         timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 100)
      };

      window.addEventListener('resize', handleResize)

      return () => {
         clearTimeout(timeoutId); // Clean up timeout
         window.removeEventListener('resize', handleResize)
      };
   }, []);

   return windowWidth;
}
