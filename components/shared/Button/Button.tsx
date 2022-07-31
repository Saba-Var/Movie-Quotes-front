import { useButton } from './useButton'
import { ButtonType } from './types.d'
import { BackArrow } from 'components'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles, onClick, backIcon } = props

  const { clickHandler } = useButton(onClick)

  return (
    <button
      className={`text-white relative animate-fade-in text-base px-6 py-2 transition-transform hover:scale-105 rounded-md ${styles}`}
      onClick={clickHandler}
      type='submit'
    >
      {backIcon && <BackArrow />}
      {title}
    </button>
  )
}

export default Button
