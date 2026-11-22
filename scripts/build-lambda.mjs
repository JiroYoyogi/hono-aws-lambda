import { build } from 'esbuild'

const tableName = process.env.DYNAMODB_TABLE_NAME

if (!tableName) {
  throw new Error('DYNAMODB_TABLE_NAME is not defined')
}

await build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  define: {
    'process.env.DYNAMODB_TABLE_NAME': JSON.stringify(tableName),
  },
})