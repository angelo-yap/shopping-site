type HeaderProps = {
  itemCount: number
  total: number
  searchValue: string
  onSearchChange: (value: string) => void
}

function Header({ itemCount, total, searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1 className="header-text">Online Shopping</h1>
      </div>

      <div className="header-controls">
        <label className="search-panel">
          <span>Search products</span>
          <input
            className="search-input"
            type="text"
            value={searchValue}
            placeholder="Try backpack, water bottle, mug, egg..."
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="cart-status">
          <p>{itemCount} items</p>
          <strong>CA${total.toFixed(2)}</strong>
        </div>
      </div>
    </header>
  )
}

export default Header
