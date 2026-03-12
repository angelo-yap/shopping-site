import type { CartItem, Product } from './types'

type CartProps = {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  onAddToCart: (product: Product) => void
  onDecreaseItem: (productId: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

function Cart({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onAddToCart,
  onDecreaseItem,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  return (
    <div className="cart-shell">
      <div className="cart-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h2>Your order</h2>
        </div>
        <button className="clear-button" onClick={onClearCart} disabled={items.length === 0}>
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add a product to get started.</p>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <img className="cart-image" src={item.image} alt={item.title} />
              <div className="cart-copy">
                <h3>{item.title}</h3>
                <p>
                  {item.quantity} x CA${item.price.toFixed(2)}
                </p>
                <strong>CA${(item.quantity * item.price).toFixed(2)}</strong>
              </div>
              <div className="cart-actions">
                <button onClick={() => onDecreaseItem(item.id)}>-</button>
                <button
                  onClick={() => onAddToCart(item)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
                <button onClick={() => onRemoveItem(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="summary-card">
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>CA${subtotal.toFixed(2)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>CA${shipping.toFixed(2)}</strong>
        </div>
        <div className="summary-row">
          <span>Estimated tax</span>
          <strong>CA${tax.toFixed(2)}</strong>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <strong>CA${total.toFixed(2)}</strong>
        </div>
        <button className="checkout-button" disabled={items.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
