export interface ProductImage {
  id: number
  item_id: number
  path: string
  color: string
}

export interface Product {
  // 產品編號
  id: string
  // 產品名稱
  name: string
  // 價格
  price: number
  // 是否在貨
  inStock: boolean
  // 庫存數
  stockQty: number
  // 分類
  categoryId: string
  // 圖片
  imgs: ProductImage[]
  // 顏色
  color: string
  releaseDate: string
}
