#!/usr/bin/env node

import { myApply } from './my-apply'

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
