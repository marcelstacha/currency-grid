import { useState, useEffect } from 'react';

export default function useDarkMode() {
   const [isDarkMode, setIsDarkMode] = useState(() => {
      const darkmode = localStorage.getItem('darkmode');

      if (darkmode !== null) {
         return JSON.parse(darkmode);
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches;
   });

   useEffect(() => {
      document.body.dataset.darkMode = isDarkMode;
      localStorage.setItem('darkmode', JSON.stringify(isDarkMode));
   }, [isDarkMode]);

   return [isDarkMode, setIsDarkMode];
}