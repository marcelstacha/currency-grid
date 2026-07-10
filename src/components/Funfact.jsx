import { useState, useEffect } from "react"
import { motion } from "framer-motion";

export default function Funfact({ funfact }) {

   const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setIsVisible(false);
      }, "800");
   }, []);

   return (<>
      <motion.div
         key={funfact}
         initial={isVisible ? { opacity: 1 } : { opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1, ease: "easeOut" }}
         className="line-height-small funfact"
      >
         {funfact}
      </motion.div>
   </>)
}