import { z } from 'zod'

// 保存・取得する記事データ
export const articleSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(100),
  url: z.string().startsWith('/'),
  tags: z.array(z.string()),
  body: z.string().min(1).max(120),
  updatedAt: z.iso.datetime(),
  publishedAt: z.iso.datetime(),
})

// 一覧取得用
export const articlesSchema = z.array(articleSchema)

// 新規登録用
export const createArticleSchema = articleSchema.omit({
  id: true,
  updatedAt: true,
  publishedAt: true,
})

// TypeScriptの型を生成
export type Article = z.infer<typeof articleSchema>
export type CreateArticle = z.infer<typeof createArticleSchema>
