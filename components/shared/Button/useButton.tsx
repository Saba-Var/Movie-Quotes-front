import { clickHandler } from './types.d'

export const useButton = (onClick: clickHandler) => {
  const clickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  return { clickHandler }
}
