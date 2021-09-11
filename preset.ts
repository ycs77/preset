import { Preset } from 'apply'

const definedPresets = {
  laravel: [
    'initialize',
    'tailwind',
    'inertia',
  ],
  vite: [
    'tailwind',
  ],
}

Preset.setName('Lucas\'s Preset')

Preset.group(preset => {
  preset.prompt().add('framework', {
    type: 'select',
    name: 'framework',
    message: 'Which framework do you want to use?',
    choices: Object.keys(definedPresets),
  })
}).withoutTitle()

Preset.group(preset => {
  preset.prompt().add('preset', {
    type: 'select',
    name: 'preset',
    message: 'Which preset do you want to apply?',
    choices: definedPresets[preset.prompts.framework],
  })
}).withoutTitle()

Preset.group(preset => {
  const presetName = preset.prompts.framework + (
    preset.prompts.preset === 'initialize' ? '' : `-${preset.prompts.preset}`
  )
  preset.apply(`ycs77/preset-${presetName}`)
}).withoutTitle()
