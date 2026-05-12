'use server'

import { prisma } from '@/lib/prisma/prisma'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

export const ordersAction = async (formData: FormData) => {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    // 2. Файлы
    const files = formData.getAll('images') as File[]
    const uploadedPaths: string[] = []

    for (const file of files) {
      if (!file || file.size === 0) continue
      if (!file.type.startsWith('image/')) continue
      if (file.size > 5 * 1024 * 1024) continue // 5 MB

      // Уникальное имя
      const ext = path.extname(file.name)
      const baseName = path.basename(file.name, ext)
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}-${baseName}${ext}`

      // Путь к папке public/uploads (от корня проекта)
      const uploadDir = path.join(process.cwd(), 'public/uploads')
      const filePath = path.join(uploadDir, uniqueName)
      const webPath = `/uploads/${uniqueName}`

      await mkdir(uploadDir, { recursive: true })
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      uploadedPaths.push(webPath)
    }

    // 3. Валидация и запись в БД
    // const newService = await prisma.order.create({
    //   data: {

    //     title: title,
    //     description: description,
    //     images: uploadedPaths, // Prisma превратит массив в JSON
    //   },
    // })
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  }
}
