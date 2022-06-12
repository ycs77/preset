import prompts from 'prompts'
import { exec } from './process'

interface PresetOption {
  name: string
  choices?: (PresetOption | string)[]
}

type PresetOptions = (PresetOption | string)[]

export interface MyApplyOptions {
  account: string
  presets: PresetOptions
  questions: string[]
  omitNames?: string[]
  resolveRepoName?: (preset: string) => string
}

export type ResolvedMyApplyOptions = Required<MyApplyOptions>

function resolveConfig(options: MyApplyOptions): ResolvedMyApplyOptions {
  return Object.assign({
    omitNames: ['initialize', 'default', 'core'],
    resolveRepoName: (preset: string) => `preset-${preset}`,
  }, options)
}

export function myApply(userOptions: MyApplyOptions) {
  const options = resolveConfig(userOptions)

  async function main() {
    const presetNameParts =
      getPresetRepoWithOption() ??
      await getPresetRepoWithPrompt(options.presets)

    const presetRepo = resolvePresetRepo(presetNameParts)

    exec(`npx @preset/cli apply ${presetRepo}`)
  }

  function getPresetRepoWithOption() {
    const optionPreset = process.argv[2]
    if (!optionPreset) return
    return optionPreset.split('-')
  }

  async function getPresetRepoWithPrompt(
    presets: PresetOptions,
    level: number = 0,
    resultParts: string[] = []
  ): Promise<string[]> {
    const pressetsMapping = new Map<string, PresetOption>()

    const { value } = await prompts({
      type: 'select',
      name: 'value',
      message: options.questions[level],
      choices: presets.map(value => {
        const preset = typeof value === 'string' ? { name: value } : value
        pressetsMapping.set(preset.name, preset)
        return {
          title: preset.name,
          value: preset.name,
        }
      }),
    }) as { value: string }

    if (!pressetsMapping.get(value).choices) {
      return [...resultParts, value]
    }

    return getPresetRepoWithPrompt(
      pressetsMapping.get(value).choices,
      level++,
      [...resultParts, value]
    )
  }

  function resolvePresetRepo(presetNameParts: string[]) {
    const name = presetNameParts.filter(p => {
      return !options.omitNames.includes(p)
    })

    return `${options.account}/${options.resolveRepoName(name.join('-'))}`
  }

  main()
}
