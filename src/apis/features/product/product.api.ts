import apiClient from '../../utils/apiClient'
import type { ProductDTO } from './product.types'

export function fetchProducts() {
  return apiClient.get<ProductDTO[]>('/products')
}
