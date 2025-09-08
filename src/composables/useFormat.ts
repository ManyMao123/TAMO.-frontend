export function useFormat() {
  /**
   * 將數字格式化為千分位
   * @param num number
   * @param locale string 可選，預設 'zh-TW'
   * @returns string
   */
  const price = (num: number, locale: string = 'zh-TW'): string => {
    if (typeof num !== 'number') return '0'
    return num.toLocaleString(locale)
  }

  /**
   * 將數字格式化為百分比
   * @param num number (0.15 -> 15%)
   * @param fractionDigits number 小數位數，預設 0
   */
  const percent = (num: number, fractionDigits: number = 0): string => {
    if (typeof num !== 'number') return '0%'
    return `${(num * 100).toFixed(fractionDigits)}%`
  }

  /**
   * 將數字格式化為貨幣
   * @param num number
   * @param currency string 貨幣符號，預設 'TWD'
   * @param locale string，預設 'zh-TW'
   */
  const currency = (num: number, currency: string = 'TWD', locale: string = 'zh-TW'): string => {
    if (typeof num !== 'number') return `${currency}0`
    return num.toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return { price, percent, currency }
}
