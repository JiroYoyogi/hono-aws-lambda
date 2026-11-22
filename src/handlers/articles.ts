import { readFile, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

import {
  articleSchema,
  articlesSchema,
  type Article,
  type CreateArticle,
} from '../schemas/article.js'

const filePath = './sample-data/articles.json'

// 記事一覧取得
export const getArticles = async (): Promise<Article[]> => {
  const json = await readFile(filePath, 'utf-8')

  return articlesSchema.parse(JSON.parse(json))
}

// 記事1件取得
export const getArticle = async (
  id: string
): Promise<Article | undefined> => {
  const articles = await getArticles()

  return articles.find((article) => article.id === id)
}

// 記事登録
export const createArticle = async (
  input: CreateArticle
): Promise<Article> => {
  const articles = await getArticles()
  const now = new Date().toISOString()

  const newArticle = articleSchema.parse({
    ...input,
    id: randomUUID(),
    updatedAt: now,
    publishedAt: now,
  })

  articles.push(newArticle)

  await writeFile(
    filePath,
    JSON.stringify(articles, null, 2),
    'utf-8'
  )

  return newArticle
}