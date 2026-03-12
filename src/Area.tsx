import type { ReactNode } from 'react'

type AreaProps = {
  itemArea: ReactNode
  cartArea: ReactNode
}

function Area({ itemArea, cartArea }: AreaProps) {
  return (
    <main className="area">
      <section>{itemArea}</section>
      <aside>{cartArea}</aside>
    </main>
  )
}

export default Area
