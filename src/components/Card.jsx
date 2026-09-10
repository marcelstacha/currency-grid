import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

export default function Card({ children, height, background, style, id, onClick, loading = true }) {

   const loader = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
         <Quantum
            size="45"
            speed="2"
            color="var(--font)"
         />
      </div>
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