export type clickHandler = (() => void) | undefined

export type ButtonType = {
  onClick?: () => void
  styles?: string
  title: string
  type: string
}
