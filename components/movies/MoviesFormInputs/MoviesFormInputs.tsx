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
        name='movie_name_en'
        language='Eng'
      />

      <AddTextInput
        placeholder='ფილმის სახელი'
        name='movie_name_ge'
        language='ქარ'
      />

      <AddTextInput placeholder={t('movies:budget')} name='budget' />

      {children}

      <AddTextInput placeholder='Director' name='director_en' language='Eng' />

      <AddTextInput placeholder='რეჟისორი' name='director_ge' language='ქარ' />

      <TextAreaInput
        placeholder='Movie description'
        name='movie_description_en'
        language='Eng'
      />

      <TextAreaInput
        placeholder='ფილმის აღწერა'
        name='movie_description_ge'
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
