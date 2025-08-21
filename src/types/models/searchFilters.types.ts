export type Gender = 'female' | 'male' | 'kids' | 'daily'
export type SaleType = 'normal' | 'preorder' | 'scheduled' | 'outlet'
export type PriceType = 'normal' | 'sale' | 'timesale'
export type StockStatus = 'inStock' | 'includeOutOfStock'

export type CategoryType =
  | 'all'
  | 'tops'
  | 'skirt'
  | 'onepiece'
  | 'outerwear'
  | 'bottoms'
  | 'bag'
  | 'shoes'
  | 'misc'
  | 'hat'
  | 'accessories'
  | 'other'

export type ColorType =
  | 'white'
  | 'black'
  | 'gray'
  | 'brown'
  | 'beige'
  | 'green'
  | 'blue'
  | 'purple'
  | 'yellow'
  | 'pink'
  | 'red'
  | 'orange'
  | 'silver'
  | 'gold'
  | 'other'

interface OptionItem<T = string | number | boolean> {
  label: string
  value: T
}

export interface ColorOptionItem extends OptionItem<ColorType> {
  color: string
}

interface FilterOptionEntry<T = any> {
  title: string
  options: OptionItem<T>[] | null
}

/** 商品查詢條件選項 */
export interface SearchFilterOptions {
  gender: FilterOptionEntry<Gender>
  category: FilterOptionEntry<CategoryType>
  color: FilterOptionEntry<ColorType> & { options: ColorOptionItem[] }
  priceRange: FilterOptionEntry<null>
  saleType: FilterOptionEntry<SaleType>
  priceType: FilterOptionEntry<PriceType>
  stockStatus: FilterOptionEntry<StockStatus>
}

/** 商品查詢條件選取結果 */
export interface SearchFilters {
  gender?: Gender
  category?: CategoryType[]
  color?: ColorType[]
  priceRange?: [number, number]
  saleType?: SaleType
  priceType?: PriceType
  stockStatus?: StockStatus
}
