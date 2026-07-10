export default function CurrencySelector({ currencies, currencySymbols, no, selectedCurrency1, selectedCurrency2, handleCurrencies }) {
   let value

   if (no == 1) {
      value = selectedCurrency1
   }
   if (no == 2) {
      value = selectedCurrency2
   }

   return (<>
      <select className="currency-select" value={value} onChange={(e) => handleCurrencies(no, e.target.value)}>
         {currencies.map((currency, index) => (
            <option key={currency} value={currency} >
               {currency}{"\u2003"}({currencySymbols[index]})
            </option>
         ))}
      </select>
   </>)
}