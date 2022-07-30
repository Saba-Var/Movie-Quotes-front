import { ButtonType } from './types.d'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles, onClick } = props

  const clickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      className={`text-white animate-fade-in text-base px-6 py-2 transition-transform hover:scale-105 rounded-md ${styles}`}
      onClick={clickHandler}
      type={'submit'}
    >
      {title}
    </button>
  )
}

export default Button
