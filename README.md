# Hono

## 始め方

- 公式インストール
- Nodeプロジェクト（⭐️今回はコレ）
- Viteプロジェクト

### インストール

```
npm init -y

npm install hono zod @hono/zod-validator @hono/node-server
npm install -D typescript tsx @types/node

npx tsc --init
```

### 設定

#### package.json

- --noEmit ... JSファイルを生成しない。typecheckでは型チェックをしたいだけで生成不要

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit",
    "build": "tsc --noEmit false --outDir dist",
    "start": "node dist/index.js"
  }
}
```

#### tsconfig.json

- moduleResolution: "NodeNext"

```js
// ❌ エラー: 拡張子がない
import { add } from "./utils/math";

// ✅ OK: 拡張子を明示
import { add } from "./utils/math.js";
```

[参考：【TypeScript】tsconfig.json の moduleResolution の役割を理解する](https://qiita.com/Yasushi-Mo/items/8e8058ffd0b151eabe1d)


```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "noEmit": true,
    "types": ["node"]
  },
  "include": ["src"]
}
```

#### .env 作成

- .env

`DynamoDB` テーブルを作成して `.env` に記載

```
DYNAMODB_TABLE_NAME=hono-sample
```

#### データの読み先の設定（テスト用のJSON？ DynamoDB？）

`src/app.ts` の下記で切り替える

```js
import {
  getArticles,
  getArticle,
  createArticle,
// } from './handlers/articles.js'
} from './handlers/articlesDynamo.js';
```

## Lambdaへのデプロイ

### コマンド

- `TypeScript` => `JavaScript`
- `dist/index.cjs` を `zip` する

```
npm run package:lambda
```

### ポイント

環境変数をコードに埋め込むために `scripts/build-lambda.mjs` を作成



