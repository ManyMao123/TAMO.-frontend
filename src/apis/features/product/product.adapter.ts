import type { ProductDTO, Product } from './product.types'

export function adaptProduct(dto: ProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: dto.price,
    desc: dto.description
  }
}
