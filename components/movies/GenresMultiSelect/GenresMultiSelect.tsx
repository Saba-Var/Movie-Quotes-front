import { useGenresMultiSelect } from './useGenresMultiSelect'
import { GenresMultiSelectProps } from './types.d'
import Select from 'react-select'

const GenresMultiSelect: React.FC<GenresMultiSelectProps> = (props) => {
  const { filmGenres, setSelectedOptions } = props

  const { options, t, whiteTextStyle } = useGenresMultiSelect(filmGenres)

  return (
    <Select
      noOptionsMessage={() => t('movies:genre-not-found')}
      placeholder={t('movies:film-genres')}
      closeMenuOnSelect={false}
      isSearchable={true}
      isClearable={false}
      options={options}
      isMulti
      onChange={(item) => {
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
            fontSize: '16px',
          }
        },

        control: (base: {}) => ({
          ...base,
          background: 'transparent',
          borderColor: '#6C757D',
          minHeight: '45px',
          boxShadow: 'none',
          outline: 'none',
          fontSize: '18px',
          color: '#ffffff',
          '&:hover': {
            border: '1px solid #6C757D',
          },
        }),
      }}
    />
  )
}

export default GenresMultiSelect
