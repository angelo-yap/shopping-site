import ItemCard from './ItemCard'
import type { Product } from './types'

type ItemAreaProps = {
  products: Product[]
  quantityById: Record<number, number>
  onAddToCart: (product: Product) => void
}

function ItemArea({ products, quantityById, onAddToCart }: ItemAreaProps) {
  return (
    <div className="item-area-shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2>Browse products</h2>
        </div>
      </div>

      {products.length === 0 ? <p className="status-card">No products found.</p> : null}

      <div className="item-area">
        {products.map((product) => (
          <ItemCard
            key={product.id}
            product={product}
            quantity={quantityById[product.id] ?? 0}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemArea
