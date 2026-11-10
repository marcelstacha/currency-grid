import { useState } from "react";

import Bill from "./Bill";

export default function CurrencySwitch({ selectedCurrency1, selectedCurrency2, onClick, isIcon = false }) {
   const [hovered, setHovered] = useState(false);

   const path1 = selectedCurrency1.toLowerCase() + ".jpg";
   const path2 = selectedCurrency2.toLowerCase() + ".jpg";

   return isIcon ? (
      <button className="switch-icon darkmode-btn" aria-label="Währungen tauschen" onClick={onClick}></button>
   ) : (
      <button
         className="bill-container darkmode-btn"
         onClick={onClick}
         aria-label="Währungen tauschen"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <div className="foreground-images">
            <Bill path={path1} classes="bill-top" hovered={hovered} />
            <Bill path={path2} classes="bill-bottom" hovered={hovered} />
         </div>
      </button>
   );
}
