import { motion, AnimatePresence } from "motion/react";
function Bill({ path, classes }) {
   return (
      <div style={{ display: "grid", placeItems: "center" }}>
         <AnimatePresence>
            <motion.img
               key={path}
               src={path}
               className={`bill ${classes}`}
               alt=""
               style={{ gridArea: "1 / 1 / 2 / 2" }}
               initial={{ opacity: 0, scale: 1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: -0.5, rotate: 9 }}
               transition={{ duration: 0.4, ease: "easeInOut" }}
            />
         </AnimatePresence>
      </div>
   );
}

export default function CurrencySwitch({ selectedCurrency1, selectedCurrency2, onClick, isIcon = false }) {

   const path1 = selectedCurrency1.toLowerCase() + ".jpg";
   const path2 = selectedCurrency2.toLowerCase() + ".jpg";

   return (
      isIcon ? (
         <button className="switch-icon darkmode-btn" aria-label="Währungen tauschen" onClick={onClick}>
            {selectedCurrency1 == selectedCurrency2 ? "?" : ""}
         </button>
      ) : (
         <button className="bill-container darkmode-btn" onClick={onClick} aria-label="Währungen tauschen">

            <div className="blurred-images">
               <Bill path={path1} classes="bill-1 blurred" />
               <Bill path={path2} classes="bill-2 blurred" />
            </div>

            <div className="blurred-images-bg">
               <div className="rotate">
                  <Bill path={path1} classes="bill-1 blurred" />
                  <Bill path={path2} classes="bill-2 blurred" />
               </div>
            </div>

            <div className="foreground-images">
               <Bill path={path1} classes="shadow bill-1" />
               <Bill path={path2} classes="shadow bill-2" />
            </div>

         </button>
      )
   );
}