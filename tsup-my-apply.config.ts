import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  dts: true,
  outExtension({ format }) {
    switch (format) {
      case 'cjs':
        return { js: `.cjs` }
      case 'esm':
        return { js: `.mjs` }
      default:
        return { js: `.${format}.js` }
    }
  },
})
