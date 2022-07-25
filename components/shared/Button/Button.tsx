import { ButtonType } from 'components/shared'

const Button: React.FC<ButtonType> = (props) => {
  const { title, styles } = props

  return (
    <button className={`text-white text-base px-6 py-2 rounded-md ${styles}`}>
      {title}
    </button>
  )
}

export default Button
