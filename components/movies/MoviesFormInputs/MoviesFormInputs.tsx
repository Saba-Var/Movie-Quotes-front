import { useMoviesFormInputs } from './useMoviesFormInputs'
import { MoviesFormInputsProp } from './types.d'
import {
  ImageDragAndDrop,
  TextAreaInput,
  AddTextInput,
  Button,
} from 'components'

const MoviesFormInputs: React.FC<MoviesFormInputsProp> = (props) => {
  const {
    emptyInputHandler,
    setEmptyFIleError,
    emptyFileError,
    buttonTitle,
    children,
    setFile,
    file,
  } = props

  const { t } = useMoviesFormInputs()

  return (
    <>
      <AddTextInput
        placeholder='Movie name'
        name='movieNameEn'
        language='Eng'
      />

      <AddTextInput
        placeholder='ფილმის სახელი'
        name='movieNameGe'
        language='ქარ'
      />

      <AddTextInput placeholder={t('movies:budget')} name='budget' />

      {children}

      <AddTextInput placeholder='Director' name='directorEn' language='Eng' />

      <AddTextInput placeholder='რეჟისორი' name='directorGe' language='ქარ' />

      <TextAreaInput
        placeholder='Movie description'
        name='movieDescriptionEn'
        language='Eng'
      />

      <TextAreaInput
        placeholder='ფილმის აღწერა'
        name='movieDescriptionGe'
        language='ქარ'
      />

      <ImageDragAndDrop
        setEmptyFIleError={setEmptyFIleError}
        emptyFileError={emptyFileError}
        setFile={setFile}
        file={file}
      />

      <Button
        styles='bg-orange !hover:scale-105 xl:text-xl'
        title={t(`movies:${buttonTitle}`)}
        onClick={emptyInputHandler}
        type='submit'
      />
    </>
  )
}

export default MoviesFormInputs
