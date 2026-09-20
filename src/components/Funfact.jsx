import { AnimatePresence, motion } from "motion/react";
import useFunfact from "../hooks/useFunfact";
import useThrottle from "../hooks/useThrottle.jsx";
import Card from "./Card";

export default function Funfact() {
   const { funfact, handleManualClick } = useFunfact();
   const throttledClick = useThrottle(handleManualClick, 800);

   return (
      <Card
         id="card-7"
         loading={false}
         onClick={throttledClick}
         style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <AnimatePresence mode="wait">
            <motion.div
               key={funfact}
               initial={{ opacity: 0, y: 4 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -4 }}
               transition={{ duration: 0.25, ease: "easeInOut" }}
               className="line-height-small funfact"
            >
               {funfact}
            </motion.div>
         </AnimatePresence>
      </Card>
   );
}
