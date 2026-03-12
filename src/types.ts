export type Product = {
  id: number
  title: string
  description: string
  price: number
  image: string
  rating: number
  stock: number
}

export type CartItem = Product & {
  quantity: number
}
