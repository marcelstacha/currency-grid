import { AnimatePresence, motion } from "motion/react";

export default function Bill({ path, classes, hovered }) {
   const isBottom = classes.includes("bill-bottom");
   const isTop = !isBottom;

   let customOpacity = 1;
   const opacityLow = 0.85;
   if (isBottom) {
      customOpacity = hovered ? 1 : opacityLow;
   }
   if (isTop) {
      customOpacity = hovered ? opacityLow : 1;
   }

   return (
      <>
         <AnimatePresence mode="sync">
            <motion.img
               key={path}
               src={path}
               className={`bill ${classes}`}
               alt={path}
               style={{ gridArea: "1 / 1 / 2 / 2" }}
               initial={{ opacity: 0 }}
               animate={{ opacity: customOpacity }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
            />
         </AnimatePresence>
      </>
   );
}
