import { randomUUID } from 'node:crypto'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb'

import {
  articleSchema,
  articlesSchema,
  type Article,
  type CreateArticle,
} from '../schemas/article.js'

// DynamoDBクライアント
const client = new DynamoDBClient({
  region: 'ap-northeast-1',
})

const docClient = DynamoDBDocumentClient.from(client)

const tableName = 'Articles'

// 記事一覧取得
export const getArticles = async (): Promise<Article[]> => {
  const result = await docClient.send(
    new ScanCommand({
      TableName: tableName,
    })
  )

  return articlesSchema.parse(result.Items ?? [])
}

// 記事1件取得
export const getArticle = async (
  id: string
): Promise<Article | undefined> => {
  const result = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: { id },
    })
  )

  if (!result.Item) {
    return undefined
  }

  return articleSchema.parse(result.Item)
}

// 記事登録
export const createArticle = async (
  input: CreateArticle
): Promise<Article> => {
  const now = new Date().toISOString()

  const article = articleSchema.parse({
    ...input,
    id: randomUUID(),
    updatedAt: now,
    publishedAt: now,
  })

  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: article,
      ConditionExpression: 'attribute_not_exists(id)',
    })
  )

  return article
}