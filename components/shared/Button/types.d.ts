export type clickHandler = (() => void) | undefined

export type ButtonType = {
  onClick?: () => void
  backIcon?: boolean
  styles?: string
  title: string
  type: string
}
