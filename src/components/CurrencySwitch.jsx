export default function CurrencySwitch({ selectedCurrency1, selectedCurrency2, onClick, isIcon = false }) {

   const path1 = selectedCurrency1.toLowerCase() + ".jpg"
   const path2 = selectedCurrency2.toLowerCase() + ".jpg"

   return (

      isIcon ?
         <div className="switch-icon" >
            {selectedCurrency1 == selectedCurrency2 ? "?" : ""}
         </div>
         :
         <>
            <div className="bill-container" onClick={onClick}>
               <div className="blurred-images">
                  <img className="bill blurred" title="bill-blurred-1" src={path1} />
                  <img className="bill blurred" title="bill-blurred-2" src={path2} />
               </div>
               <div className="foreground-images">
                  <img className="shadow bill" title="bill-1" src={path1} />
                  <img className="shadow bill" title="bill-2" src={path2} />
               </div>
            </div>
         </>
   )
}
