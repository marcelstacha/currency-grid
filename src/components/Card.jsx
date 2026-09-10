import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

export default function Card({ children, height, background, style, id, onClick, loading = true }) {

   const loader = (
      <DotWave
         size="47"
         speed="1"
      />
   )

   if (onClick) {
      return (
         <section
            id={id}
            className="card"
            onClick={onClick}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
               }
            }}
            style={{
               background: background,
               height: `${height}px`,
               ...style
            }}>
            {loading ? loader : children}
         </section>
      )
   } else {
      return (
         <section
            className="card"
            id={id}
            style={{
               background: background,
               height: `${height}px`,
               ...style
            }}>
            {loading ? loader : children}
         </section>
      )
   }



}