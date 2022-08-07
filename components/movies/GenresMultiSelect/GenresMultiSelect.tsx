import { useGenresMultiSelect } from './useGenresMultiSelect'
import { GenresMultiSelectProps } from './types.d'
import Select from 'react-select'

const GenresMultiSelect: React.FC<GenresMultiSelectProps> = (props) => {
  const {
    setGenreNotSelected,
    setSelectedOptions,
    genreNotSelected,
    filmGenres,
  } = props

  const { options, t, whiteTextStyle } = useGenresMultiSelect(filmGenres)

  return (
    <div className='h-fit mb-[-10px]'>
      <Select
        noOptionsMessage={() => t('movies:genre-not-found')}
        placeholder={t('movies:film-genres')}
        closeMenuOnSelect={false}
        isSearchable={true}
        isClearable={false}
        options={options}
        isMulti
        onChange={(item: any) => {
          if (genreNotSelected) {
            setGenreNotSelected(false)
          }
          setSelectedOptions(item)
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
        styles={{
          multiValueLabel: (styles: {}) => whiteTextStyle(styles),

          placeholder: (styles: {}) => whiteTextStyle(styles),

          input: (styles: {}) => whiteTextStyle(styles),

          multiValue: (styles: {}) => {
            return {
              ...styles,
              backgroundColor: '#6C757D',
              fontSize: '14px',
            }
          },

          control: (base: {}) => ({
            ...base,
            background: 'transparent',
            borderColor: `${genreNotSelected ? '#E31221' : '#6C757D'}`,
            minHeight: '45px',
            boxShadow: 'none',
            outline: 'none',
            fontSize: '18px',
            color: '#ffffff',
            '&:hover': {
              border: `1px solid ${genreNotSelected ? '#E31221' : '#6C757D'}`,
            },
          }),
        }}
      />

      <div className='h-4'>
        {genreNotSelected && (
          <p className='text-red-500 text-sm'>Select film genre</p>
        )}
      </div>
    </div>
  )
}

export default GenresMultiSelect
