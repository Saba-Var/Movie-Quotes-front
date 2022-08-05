import { useAddMovieForm } from './useAddMovieForm'
import { AddMovieFormProps } from './types.d'
import { FormWrapper } from 'components'

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const { setShowAddMovieForm } = props
  const { t } = useAddMovieForm()

  return (
    <FormWrapper
      setShowForm={setShowAddMovieForm}
      title={t('movies:add-movie')}
    >
      <div>
        <p className='text-9xl text-green'>Form</p>
      </div>
    </FormWrapper>
  )
}
export default AddMovieForm
