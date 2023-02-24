import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  dts: true,
  outExtension({ format }) {
    if (format === 'cjs') {
      return { js: `.cjs` }
    } else if (format === 'esm') {
      return { js: `.mjs` }
    }
    return { js: `.${format}.js` }
  },
})
