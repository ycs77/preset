#!/usr/bin/env node

import { myApply } from './my-apply'

myApply({
  account: 'ycs77',
  presets: {
    laravel: [
      'initialize',
      'tailwind',
      'inertia',
    ],
    vite: [
      'tailwind',
    ],
  },
})
