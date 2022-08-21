import { useSearchBar } from './useSearchBar'
import { SearchIcon } from 'components'

const SearchBar = () => {
  const { t, costumePlaceholder, setCustomPlaceholder, georgianLan } =
    useSearchBar()

  return (
    <div className='relative hidden 1xl:block z-[999]  '>
      {costumePlaceholder && (
        <p className='absolute animate-fade-in-delay text-xs 2xl:text-xl xl:text-base z-[-2] left-[30px] xl:left-7 text-inputGray top-1/2 -translate-y-1/2'>
          {`${t('news-feed:enter')}`} <span className='text-white'>@</span>{' '}
          {`${t('news-feed:search-movies')}`}, {`${t('news-feed:enter')}`}{' '}
          <span className='text-white'>#</span>{' '}
          {`${t('news-feed:search-quotes')}`}
        </p>
      )}

      <label>
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
          } text-lg 2xl:focus:w-[700px] pl-12 xl:focus:w-[500px] focus:pl-7 xl:pl-10 z-[99] focus:text-white text-transparent pt-1 focus:placeholder-transparent focus:w-[380px] lg:focus:w-[430px] xl:text-xl bg-transparent outline-none transition-transform focus:pb-[6px] focus:border-b focus:border-b-gray-600 w-[131px] text-white placeholder-inputGray h-full ${
            georgianLan && 'w-[80px] !pl-7 focus:!pl-7'
          }`}
          onFocusCapture={() => setCustomPlaceholder(true)}
          onBlur={() => setCustomPlaceholder(false)}
          placeholder={t('news-feed:search-by')}
          type='text'
        />
      </label>
    </div>
  )
}

export default SearchBar
