import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

export default function Card({ children, height, background, style, id, onClick, loading = true }) {

   const loader = (
      <DotWave
         size="47"
         speed="1"
      />
   )

   return (
      <section
         id={id}
         onClick={onClick}
         style={{
            background: background,
            height: `${height}px`,
            ...style
         }}>
         {loading ? loader : children}
      </section>
   )
}