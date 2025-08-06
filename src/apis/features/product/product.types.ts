export interface ProductDTO {
  id: number
  name: string
  price: number
  description: string
}

// 這邊還要再考慮一下，因為有types的資料夾了...不知道Product型別要放這還是放那?
export interface Product {
  id: number
  name: string
  price: number
  desc: string // 轉換後使用不同命名
}
