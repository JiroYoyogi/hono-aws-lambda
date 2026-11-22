import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

import {
  getArticles,
  getArticle,
  createArticle,
} from './handlers/articles.js'
// } from './handlers/articlesDynamo.js';

import { createArticleSchema } from './schemas/article.js'

const app = new Hono()

// 記事一覧取得
app.get('/articles', async (c) => {
  const articles = await getArticles()
  return c.json(articles)
})

// 記事1件取得
app.get(
  '/articles/:id',
  zValidator('param', z.object({ id: z.uuid() })),
  async (c) => {
    const { id } = c.req.valid('param')
    const article = await getArticle(id)

    if (!article) {
      return c.json({ message: 'Not found' }, 404)
    }

    return c.json(article)
  }
)

// 記事登録
app.post(
  '/articles',
  zValidator('json', createArticleSchema),
  async (c) => {
    const input = c.req.valid('json')
    const article = await createArticle(input)

    return c.json(article, 201)
  }
)

export default app