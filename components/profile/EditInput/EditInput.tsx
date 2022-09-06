import { useEditInput } from './useEditInput'
import { EditInputProps } from './types.d'

const EditInput: React.FC<EditInputProps> = (props) => {
  const { clickHandler, text, styles } = props

  const { locale } = useEditInput()

  return (
    <div
      onClick={clickHandler}
      className={`cursor-pointer 1xl:!-right-12 lg:!-right-16 top-9 absolute active:scale-100 transition-transform hover:scale-[1.02] animate-fade-in text-inputGray text-base 1xl:text-xl ${
        locale === 'ge' &&
        '1xl:!-right-[60px] top-10 1xl:!text-sm lg:!text-base lg:!-right-20 xl:top-9 xl:!-right-24 xl:!text-xl'
      } ${styles}`}
    >
      {text}
    </div>
  )
}

export default EditInput
