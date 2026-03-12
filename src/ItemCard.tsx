import type { Product } from './types'

type ItemCardProps = {
  product: Product
  quantity: number
  onAddToCart: (product: Product) => void
}

function ItemCard({ product, quantity, onAddToCart }: ItemCardProps) {
  const isAtStockLimit = quantity >= product.stock

  return (
    <article className="item">
      <img className="itemImage" src={product.image} alt={product.title} />
      <div className="item-copy">
        <h3 className="productName">{product.title}</h3>
        <p className="item-description">{product.description}</p>
      </div>

      <div className="item-meta">
        <div>
          <p className="price">CA${product.price.toFixed(2)}</p>
          <p className="item-details">
            {product.stock} in stock · {product.rating.toFixed(1)} / 5
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => onAddToCart(product)}
          disabled={isAtStockLimit}
        >
          {product.stock === 0
            ? 'Out of stock'
            : isAtStockLimit
              ? 'Max in cart'
              : quantity > 0
                ? `Add another (${quantity})`
                : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default ItemCard
