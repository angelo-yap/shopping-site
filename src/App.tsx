import { useEffect, useReducer } from 'react'
import Header from './Header'
import Area from './Area'
import ItemArea from './ItemArea'
import Cart from './Cart'
import { products } from './Products'
import type { CartItem, Product } from './types'

type AppState = {
  products: Product[]
  cart: CartItem[]
  searchValue: string
}

type AppAction =
  | { type: 'update-search'; payload: string }
  | { type: 'add-to-cart'; payload: Product }
  | { type: 'decrease-item'; payload: number }
  | { type: 'remove-item'; payload: number }
  | { type: 'clear-cart' }

const initialState: AppState = {
  products: products,
  cart: [],
  searchValue: '',
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'update-search':
      return {
        ...state,
        searchValue: action.payload,
      }
    case 'add-to-cart': {
      if (action.payload.stock <= 0) {
        return state
      }

      const existingItem = state.cart.find((item) => item.id === action.payload.id)

      if (existingItem) {
        if (existingItem.quantity >= action.payload.stock) {
          return state
        }

        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      }
    }
    case 'decrease-item':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'remove-item':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case 'clear-cart':
      return {
        ...state,
        cart: [],
      }
    default:
      return state
  }
}

function readStoredCart(): CartItem[] {
  const savedCart = localStorage.getItem('shopping-cart-items')

  if (!savedCart) {
    return []
  }

  try {
    const parsedCart = JSON.parse(savedCart)

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart.filter(
      (item): item is CartItem =>
        typeof item?.id === 'number' &&
        typeof item?.title === 'string' &&
        typeof item?.price === 'number' &&
        typeof item?.quantity === 'number',
    )
  } catch {
    return []
  }
}

function initializeState(state: AppState): AppState {
  const storedCart = readStoredCart()

  const normalizedCart = storedCart
    .map((item) => {
      const matchingProduct = state.products.find((product) => product.id === item.id)

      if (!matchingProduct || matchingProduct.stock <= 0) {
        return null
      }

      return {
        ...item,
        quantity: Math.min(item.quantity, matchingProduct.stock),
      }
    })
    .filter((item): item is CartItem => Boolean(item))

  return {
    ...state,
    cart: normalizedCart,
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState, initializeState)

  useEffect(() => {
    localStorage.setItem('shopping-cart-items', JSON.stringify(state.cart))
  }, [state.cart])

  const filteredProducts = state.products.filter((product) => {
    const matchesSearch = `${product.title} ${product.description}`
      .toLowerCase()
      .includes(state.searchValue.toLowerCase())

    return matchesSearch
  })

  const quantityById = state.cart.reduce<Record<number, number>>((cartMap, item) => {
    cartMap[item.id] = item.quantity
    return cartMap
  }, {})

  const itemCount = state.cart.reduce((count, item) => count + item.quantity, 0)
  const subtotal = state.cart.reduce(
    (runningTotal, item) => runningTotal + item.price * item.quantity,
    0,
  )
  const shipping = itemCount > 0 ? 14.99 : 0
  const tax = subtotal * 0.13
  const total = subtotal + shipping + tax

  return (
    <>
      <Header
        itemCount={itemCount}
        total={total}
        searchValue={state.searchValue}
        onSearchChange={(value) => dispatch({ type: 'update-search', payload: value })}
      />
      <Area
        itemArea={
          <ItemArea
            products={filteredProducts}
            quantityById={quantityById}
            onAddToCart={(product) => dispatch({ type: 'add-to-cart', payload: product })}
          />
        }
        cartArea={
          <Cart
            items={state.cart}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onAddToCart={(product) => dispatch({ type: 'add-to-cart', payload: product })}
            onDecreaseItem={(productId) =>
              dispatch({ type: 'decrease-item', payload: productId })
            }
            onRemoveItem={(productId) =>
              dispatch({ type: 'remove-item', payload: productId })
            }
            onClearCart={() => dispatch({ type: 'clear-cart' })}
          />
        }
      />
    </>
  )
}

export default App
