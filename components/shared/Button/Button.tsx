import { useButton } from './useButton'
import { ButtonType } from './types.d'
import { BackArrow } from 'components'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles, onClick, backIcon } = props

  const { clickHandler } = useButton(onClick)

  return (
    <button
      className={`text-white animate-fade-in relative text-base px-6 py-2 active:scale-100 transition-transform hover:scale-[1.03] rounded-md ${styles}`}
      onClick={clickHandler}
      type='submit'
    >
      {backIcon && <BackArrow />}
      {title}
    </button>
  )
}

export default Button
