export const OFFSET = 30

export function getDate(offset, iso) {
   /*
      let date = new Date();
      //Zeitzone fix
      date.setHours(date.getHours() - 7);
      if (offset) {
         date.setDate(date.getDate() - 30)
      }
      if (iso) {
         date = date.toISOString().split('T')[0];
      }
   
      return date
   
   }
   */

   let dateLocal = new Date();

   const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
   });

   const raw = formatter.formatToParts(dateLocal);
   const month = (raw[0].value) - 1
   const day = raw[2].value
   const year = raw[4].value
   const hour = raw[6].value
   const minute = raw[8].value

   let date = new Date(year, month, day, hour, minute)

   if (offset) {
      date.setDate(date.getDate() - (OFFSET))
   }

   if (iso) {
      //2025-12-20
      date = date.toISOString().split('T')[0];
   }

   return date
}
