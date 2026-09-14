import { useEffect, useRef } from "react"
import useFunfact from '../hooks/useFunfact';
import { motion, AnimatePresence } from "framer-motion";

export default function Funfact() {

   const { funfact, getNextFunfact } = useFunfact();

   const savedTimerRef = useRef(null);
   const timerRef = useRef(null);

   useEffect(() => {
      savedTimerRef.current = getNextFunfact;
   }, [getNextFunfact]);

   function startFunfactTimer() {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
         if (savedTimerRef.current) savedTimerRef.current();
      }, 8300);
   }

   useEffect(() => {
      startFunfactTimer();
      return () => {
         if (timerRef.current) clearInterval(timerRef.current);
      };
   }, []);

   function getCustomNextFunfact() {
      getNextFunfact();
      startFunfactTimer();
   }

   return (
      <AnimatePresence mode="wait">
         <motion.div
            onClick={getCustomNextFunfact}
            key={funfact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="line-height-small funfact"
         >
            {funfact}
         </motion.div>
      </AnimatePresence>
   )
}