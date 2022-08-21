import { useSearchBar } from './useSearchBar'
import { SearchBarProps } from './types.d'
import { SearchIcon } from 'components'

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { inputValue, setInputValue } = props

  const {
    setCustomPlaceholder,
    costumePlaceholder,
    changeHandler,
    georgianLan,
    t,
  } = useSearchBar(setInputValue, inputValue)

  return (
    <div className='relative hidden 1xl:block z-[999]  '>
      {costumePlaceholder && inputValue === '' && (
        <p className='absolute animate-fade-in-delay text-xs 2xl:text-xl xl:text-base z-[-2] left-[30px] xl:left-7 text-inputGray top-1/2 -translate-y-1/2'>
          {`${t('news-feed:enter')}`} <span className='text-white'>@</span>{' '}
          {`${t('news-feed:search-movies')}`}, {`${t('news-feed:enter')}`}{' '}
          <span className='text-white'>#</span>{' '}
          {`${t('news-feed:search-quotes')}`}
        </p>
      )}

      <label onClick={() => setCustomPlaceholder(true)}>
        <div
          className={`${
            costumePlaceholder && '!left-0'
          } absolute top-1/2 -translate-y-1/2 left-4 xl:left-2 ${
            georgianLan && '!left-0'
          }`}
        >
          <SearchIcon styles='!block w-[20px] h-[20px]' />
        </div>

        <input
          className={`${
            costumePlaceholder && 'animate-fold-out'
          } text-lg pl-12 xl:pl-10 z-[99] pt-1 xl:text-xl bg-transparent outline-none transition-transform w-[131px] text-white placeholder-inputGray h-full ${
            georgianLan && 'w-[80px] !pl-7 focus:!pl-7'
          } ${
            costumePlaceholder &&
            '2xl:w-[700px] xl:w-[500px] xl:pl-7 pl-7 text-white placeholder-transparent w-[380px] lg:w-[430px] pb-[6px] border-b border-b-gray-600'
          }`}
          placeholder={t('news-feed:search-by')}
          onChange={(e) => changeHandler(e)}
          type='text'
        />
      </label>
    </div>
  )
}

export default SearchBar
