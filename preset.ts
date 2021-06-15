import { Preset } from 'apply'

const presets = [
  'laravel',
  'laravel-tailwindcss',
  'laravel-inertia',
  'vite-tailwindcss',
]

Preset.setName('Lucas\'s Presets')

Preset.prompt().add('preset', {
	type: 'select',
	name: 'preset',
	message: 'Which preset do you want to apply?',
  choices: presets,
})

Preset.group(preset => {
  preset.apply(`ycs77/preset-${preset.prompts.preset}`)
}).ifPrompt('preset')
