import { useGenresMultiSelect } from './useGenresMultiSelect'
import { GenresMultiSelectProps } from './types.d'
import Select from 'react-select'

const GenresMultiSelect: React.FC<GenresMultiSelectProps> = (props) => {
  const { filmGenres, setSelectedOptions } = props

  const { options, t } = useGenresMultiSelect(filmGenres)

  return (
    <Select
      placeholder={t('movies:film-genres')}
      closeMenuOnSelect={false}
      isSearchable={true}
      isClearable={true}
      options={options}
      isMulti
      onChange={(item) => {
        setSelectedOptions(item)
      }}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base: {}) => ({
          ...base,
          borderColor: '#6C757D !important',
          background: 'transparent',
          minHeight: '45px',
          fontSize: '19px',
          color: '#ffffff',
        }),

        placeholder: (defaultStyles: {}) => {
          return {
            ...defaultStyles,
            color: '#ffffff',
          }
        },

        multiValue: (styles: {}) => {
          return {
            ...styles,
            backgroundColor: '#6C757D',
            fontSize: '16px',
          }
        },

        multiValueLabel: (styles: {}) => ({
          ...styles,
          color: '#ffffff',
        }),
      }}
    />
  )
}

export default GenresMultiSelect
