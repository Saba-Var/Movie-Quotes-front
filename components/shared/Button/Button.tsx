import { ButtonType } from './types.d'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles } = props

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <button
      onClick={clickHandler}
      className={`text-white animate-fade-in text-base px-6 py-2 transition-transform hover:scale-105 rounded-md ${styles}`}
    >
      {title}
    </button>
  )
}

export default Button
