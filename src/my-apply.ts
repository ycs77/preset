import prompts from 'prompts'
import { exec } from './process'

export interface MyApplyOptions {
  account: string
  presets: Record<string, string[]>
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
      await getPresetRepoWithPrompt()

    const presetRepo = resolvePresetRepo(presetNameParts)

    exec(`npx @preset/cli apply ${presetRepo}`)
  }

  function getPresetRepoWithOption() {
    const optionPreset = process.argv[2]
    if (!optionPreset) return
    return optionPreset.split('-')
  }

  async function getPresetRepoWithPrompt() {
    const { framework: first } = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Which framework do you want to use?',
      choices: Object
        .keys(options.presets)
        .map(framework => ({
          title: framework,
          value: framework,
        })),
    }) as { framework: keyof typeof options.presets }

    const { framework: second } = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Which preset do you want to apply?',
      choices: options.presets[first]
        .map(preset => ({
          title: preset,
          value: preset,
        })),
    }) as { framework: string }

    return [first, second]
  }

  function resolvePresetRepo(presetNameParts: string[]) {
    const name = presetNameParts.filter(p => {
      return !options.omitNames.includes(p)
    })

    return `${options.account}/${options.resolveRepoName(name.join('-'))}`
  }

  main()
}
