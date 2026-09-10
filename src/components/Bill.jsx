import { motion, AnimatePresence } from "motion/react";

export default function Bill({ path, classes }) {

   const isBlurred = classes.includes("blurred-bg")

   return (<>
      <div style={{ display: "grid", placeItems: "center", position: "relative" }} className={`bill ${classes}`}>
         <AnimatePresence mode={isBlurred ? "popLayout" : "sync"}>
            <motion.img
               key={path}
               src={path}
               className="bill"
               alt={path}
               style={{ gridArea: "1 / 1 / 2 / 2" }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.4, ease: "easeInOut" }}
            />
         </AnimatePresence>
      </div>

   </>)
}