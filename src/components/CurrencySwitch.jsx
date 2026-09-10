import Bill from "./Bill";

export default function CurrencySwitch({ selectedCurrency1, selectedCurrency2, onClick, isIcon = false }) {

   const path1 = selectedCurrency1.toLowerCase() + ".jpg";
   const path2 = selectedCurrency2.toLowerCase() + ".jpg";

   return (
      isIcon ? (
         <button className="switch-icon darkmode-btn" aria-label="Währungen tauschen" onClick={onClick}>
         </button>
      ) : (
         <button className="bill-container darkmode-btn" onClick={onClick} aria-label="Währungen tauschen">

            <div className="blurred-images">
               <Bill path={path1} classes="bill-1 blurred" />
               <Bill path={path2} classes="bill-2 blurred" />
            </div>

            <div className="blurred-images-bg">
               <Bill path={path1} classes="bill-1 blurred-bg" />
               <Bill path={path2} classes="bill-2 blurred-bg" />
            </div>
            <div className="blurred-images-bg2">
               <Bill path={path1} classes="bill-1 blurred-bg2" />
               <Bill path={path2} classes="bill-2 blurred-bg2" />
            </div>

            <div className="foreground-images">
               <Bill path={path1} classes="shadow bill-1" />
               <Bill path={path2} classes="shadow bill-2" />
            </div>

         </button>
      )
   );
}