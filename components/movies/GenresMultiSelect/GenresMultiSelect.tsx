import { GenresMultiSelectProps } from './types.d'
import Select from 'react-select'

const GenresMultiSelect: React.FC<GenresMultiSelectProps> = (props) => {
  const { filmGenres, setSelectedOptions } = props

  const options = [{}]

  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: genre })
  })

  options.shift()

  return (
    <Select
      closeMenuOnSelect={false}
      onChange={(item) => {
        setSelectedOptions(item)
      }}
      placeholder='Film Genres'
      isSearchable={true}
      isClearable={true}
      options={options}
      isMulti
    />
  )
}

export default GenresMultiSelect
