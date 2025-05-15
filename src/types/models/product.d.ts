export interface Product {
  // 產品編號
  id: number
  // 產品名稱
  name: string
  // 價格
  price: number
  // 是否在貨
  inStock: boolean
  // 庫存數
  stockQty: number
  // 圖片
  img: string
  // 分類
  categoryId: string
}
