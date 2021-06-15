import { Preset } from 'apply'

const definedPresets = {
  laravel: [
    'initialize',
    'tailwindcss',
    'inertia',
  ],
  vite: [
    'tailwindcss',
  ],
}

Preset.setName('Lucas\'s Preset')

Preset.prompt().add('framework', {
	type: 'select',
	name: 'framework',
	message: 'Which framework do you want to use?',
  choices: Object.keys(definedPresets),
})

Preset.group(preset => {
  preset.prompt().add('preset', {
    type: 'select',
    name: 'preset',
    message: 'Which preset do you want to apply?',
    choices: definedPresets[preset.prompts.framework],
  })
})

Preset.group(preset => {
  const presetName = preset.prompts.framework + (
    preset.prompts.preset === 'initialize'
      ? ''
      : `-${preset.prompts.preset}`
  )

  preset.apply(`ycs77/preset-${presetName}`)
}).ifPrompt('preset')
