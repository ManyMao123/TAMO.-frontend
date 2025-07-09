const modules = import.meta.glob('./*.{jpg,jpeg,png,webp}', { eager: true })

console.log('匹配到的圖片路徑：', Object.keys(modules))

const images: string[] = []

for (const path in modules) {
  const image = (modules[path] as { default: string }).default
  images.push(image)
}

export default images
