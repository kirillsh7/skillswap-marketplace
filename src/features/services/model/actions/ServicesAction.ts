'use server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma/prisma'
import { mkdir, writeFile } from 'fs/promises'
import { getServerSession } from 'next-auth'
import path from 'path'

export const ServicesAction = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, error: 'Пользователь не авторизован' }
    }

    const title = formData.get('title') as string
    const categories = formData.get('categories') as string
    const subcategories = formData.get('subcategories') as string
    const description = formData.get('description') as string
    const tagsJson = (formData.get('tags') as string) || '[]'
    const packagesJson = (formData.get('packages') as string) || '[]'
    const faqJson = (formData.get('faq') as string) || '[]'

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
    const newService = await prisma.services.create({
      data: {
        title,
        categories,
        subcategories,
        description,
        tags: JSON.parse(tagsJson),
        packages: JSON.parse(packagesJson),
        faq: JSON.parse(faqJson),
        images: uploadedPaths,
        authorId: session.user.id,
      },
    })
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  }
}
