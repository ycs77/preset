# my-preset

@ycs77/preset 還有一個 my-preset 功能，是一個用於產生選擇/執行 preset CLI 的小工具。

## 安裝

```bash
yarn add @ycs77/preset
```

然後新增 `cli.js`：

```js
#!/usr/bin/env node

const { myApply } = require('@ycs77/preset')

myApply({
  account: 'ycs77',
  presets: [
    {
      name: 'laravel',
      choices: [
        'initialize',
        'tailwind',
        'inertia',
      ],
    },
    {
      name: 'vite',
      choices: ['tailwind'],
    },
  ],
  questions: [
    'Which framework do you want to use?',
    'Which preset do you want to apply?',
  ],
})
```

`package.json` 裡把 `YOUR_NAME` 替換成你的名字，`YOUR_USERNAME` 替換成你的帳號：

```json
{
  "name": "@YOUR_USERNAME/preset",
  "version": "0.1.0",
  "description": "Preset for YOUR_NAME.",
  "author": "YOUR_NAME",
  "license": "MIT",
  "files": [
    "dist/*"
  ],
  "bin": {
    "YOUR_USERNAME-preset": "dist/cli.js"
  },
  "scripts": {
    "dev:cli": "esbuild cli.js --bundle --platform=node --watch --outfile=dist/cli.js",
    "build:cli": "esbuild cli.js --bundle --platform=node --outfile=dist/cli.js"
  },
  "dependencies": {
    "@ycs77/preset": "0.1.0"
  },
  "devDependencies": {
    "esbuild": "^0.14.43"
  }
}
```

## TODO

- [ ] my-preset 初始 repo 指令
- [ ] 開 `ycs77/my-preset` repo & `my-preset` package
