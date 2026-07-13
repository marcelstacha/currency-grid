import CurrencySelector from "./CurrencySelector"
import CurrencySwitch from "./CurrencySwitch"
import { getFullCurrencyName } from '../currencies';

export default function CurrencyBox({ textValue, handleTextField, currencySymbols, currencies, selectedCurrency1, selectedCurrency2, handleCurrencies, onClick, latest }) {

   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest

   return (<>
      {/*<div className="currency-box-label">
         {getFullCurrencyName(selectedCurrency1)}
      </div>*/}
      <div className="currency-box">

         <input value={textValue} placeholder="Wert" onChange={handleTextField} type="number"></input>
         <CurrencySelector
            no={1}
            currencySymbols={currencySymbols}
            currencies={currencies}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            handleCurrencies={handleCurrencies}
         />
         <input value={textValue2 ? textValue2.toFixed(2) : "?"} onChange={handleTextField} disabled></input>
         <CurrencySelector
            no={2}
            currencySymbols={currencySymbols}
            currencies={currencies}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            handleCurrencies={handleCurrencies}
         />
         <div className="star"
            onClick={onClick}
         >
            <CurrencySwitch
               selectedCurrency1={selectedCurrency1}
               selectedCurrency2={selectedCurrency2}
               isIcon={true}
            />
         </div>

      </div>
      {/*<div className="currency-box-label">
         {getFullCurrencyName(selectedCurrency2)}
      </div>*/}
   </>)
}