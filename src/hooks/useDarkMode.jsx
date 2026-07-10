import { useState, useEffect } from 'react';

export default function useDarkMode() {
   const [isDarkMode, setIsDarkMode] = useState(getDarkMode())

   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false')
      localStorage.setItem('darkmode', JSON.stringify(isDarkMode))
   }, [isDarkMode])

   function getDarkMode() {
      const darkmode = localStorage.getItem("darkmode")
      if (darkmode) {
         return (JSON.parse(darkmode))
      } else {
         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log("dark-mode from OS - ON")
            return true
         } else {
            console.log("dark-mode from OS - OFF")
            return false
         }
      }
   }

   return [isDarkMode, setIsDarkMode];
}