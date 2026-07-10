
export async function handler(event, context) {
   // Extract ALL dynamic parameters sent from your React frontend
   const {
      start_date,
      end_date,
      base,
      symbols
   } = event.queryStringParameters;

   // eslint-disable-next-line no-undef
   const API_KEY = process.env.CURRENCY_API_KEY;

   // Inject the exact variables we just extracted
   const url = `https://api.currencybeacon.com/v1/timeseries?api_key=${API_KEY}&base=${base}&start_date=${start_date}&end_date=${end_date}&symbols=${symbols}`;

   try {
      const response = await fetch(url);
      const data = await response.json();

      return {
         statusCode: 200,
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
         },
         body: JSON.stringify(data),
      };
   } catch (error) {
      return {
         statusCode: 500,
         body: JSON.stringify({ error: 'Failed fetching data' }),
      };
   }
}