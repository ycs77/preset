import spawn from 'cross-spawn'

export function exec(command: string) {
  const parts = command.split(' ')
  spawn(parts[0], parts.slice(1), {
    stdio: 'inherit',
  })
}
