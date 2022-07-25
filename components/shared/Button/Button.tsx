import { ButtonType } from 'components/shared'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles } = props

  return (
    <button
      className={`text-white animate-fade-in text-base px-6 py-2 transition-transform hover:scale-105 rounded-md ${styles}`}
    >
      {title}
    </button>
  )
}

export default Button
