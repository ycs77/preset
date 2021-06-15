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

Preset.setName('Lucas\'s Presets')

Preset.prompt().add('mainFramework', {
	type: 'select',
	name: 'mainFramework',
	message: 'Which framework do you want to use?',
  choices: Object.keys(definedPresets),
})

Preset.group(preset => {
  preset.prompt().add('preset', {
    type: 'select',
    name: 'preset',
    message: 'Which preset do you want to apply?',
    choices: definedPresets[preset.prompts.mainFramework],
  })
})

Preset.group(preset => {
  const presetName = preset.prompts.mainFramework + (
    preset.prompts.preset === 'initialize'
      ? ''
      : `-${preset.prompts.preset}`
  )

  preset.apply(`ycs77/preset-${presetName}`)
}).ifPrompt('preset')
