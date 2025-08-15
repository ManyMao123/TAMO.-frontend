import type {
  Gender,
  CategoryType,
  SaleType,
  PriceType,
  StockStatus,
  ColorType,
  SearchFilterOptions
} from '@/types/models/searchFilters.types'

export const genderOptions: { label: string; value: Gender }[] = [
  { label: '女性', value: 'female' },
  { label: '男性', value: 'male' },
  { label: '孩童', value: 'kids' },
  { label: '日常用品', value: 'daily' }
]

export const categoryOptions: { label: string; value: CategoryType }[] = [
  { label: '全部', value: 'all' },
  { label: '上衣', value: 'tops' },
  { label: '裙子', value: 'skirt' },
  { label: '連身裙', value: 'onepiece' },
  { label: '外套', value: 'outerwear' },
  { label: '下身', value: 'bottoms' },
  { label: '包包', value: 'bag' },
  { label: '鞋子', value: 'shoes' },
  { label: '雜貨', value: 'misc' },
  { label: '帽子', value: 'hat' },
  { label: '飾品', value: 'accessories' },
  { label: '其他', value: 'other' }
]

export const colorOptions: { label: string; value: ColorType; color: string }[] = [
  { label: '白色系', value: 'white', color: '#ffffff' },
  { label: '黑色系', value: 'black', color: '#000000' },
  { label: '灰色系', value: 'gray', color: '#808080' },
  { label: '棕色系', value: 'brown', color: '#8B4513' },
  { label: '米色系', value: 'beige', color: '#f5f5dc' },
  { label: '綠色', value: 'green', color: '#228B22' },
  { label: '藍色', value: 'blue', color: '#1E90FF' },
  { label: '紫色', value: 'purple', color: '#9370DB' },
  { label: '黃色', value: 'yellow', color: '#FFD700' },
  { label: '粉色', value: 'pink', color: '#FFC0CB' },
  { label: '紅色', value: 'red', color: '#FF4500' },
  { label: '橘色', value: 'orange', color: '#FFA500' },
  { label: '銀色', value: 'silver', color: '' },
  { label: '金色', value: 'gold', color: '' },
  { label: '其他色', value: 'other', color: '#ffffff' }
]

export const stockStatusOptions: { label: string; value: StockStatus }[] = [
  { label: '有庫存', value: 'inStock' },
  { label: '包含缺貨商品', value: 'includeOutOfStock' }
]

export const saleTypeOptions: { label: string; value: SaleType }[] = [
  { label: '通常商品', value: 'normal' },
  { label: '預約商品', value: 'preorder' },
  { label: '販賣預定商品', value: 'scheduled' },
  { label: '出清商品', value: 'outlet' }
]

export const priceTypeOptions: { label: string; value: PriceType }[] = [
  { label: '通常價格', value: 'normal' },
  { label: '特價價格', value: 'sale' },
  { label: '限時特價', value: 'timesale' }
]

export const searchFilterOptions: SearchFilterOptions = {
  gender: {
    title: '性別',
    options: genderOptions
  },
  category: {
    title: '分類',
    options: categoryOptions
  },
  color: {
    title: '顏色',
    options: colorOptions
  },
  priceRange: {
    title: '價格區間',
    options: null
  },
  saleType: {
    title: '販售類型',
    options: saleTypeOptions
  },
  priceType: {
    title: '價格種類',
    options: priceTypeOptions
  },
  stockStatus: {
    title: '庫存狀態',
    options: stockStatusOptions
  }
}
