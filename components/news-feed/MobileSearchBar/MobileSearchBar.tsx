import { BackArrow, SearchIcon, NewsFeedPost } from 'components'
import { useMobileSearchBar } from './useMobileSearchBar'
import { MobileSearchBarProps } from './types.d'

const MobileSearchBar: React.FC<MobileSearchBarProps> = (props) => {
  const { setMobileSearchMode } = props

  const { t, changeHandler, searchedPosts, inputValue } = useMobileSearchBar()

  return (
    <div className='bg-formModalBlue 1xl:hidden animate-scale-up fixed top-0 left-0 h-screen w-screen overflow-y-auto'>
      <div className='flex px-6 gap-4 items-center py-[20px] border-b border-b-gray-600'>
        <BackArrow
          onClick={() => setMobileSearchMode(false)}
          styles='block w-[20px] h-[22px]'
          clearStyles={true}
        />

        <p className='text-xl font-Helvetica-Neue-Geo text-white'>
          {t('news-feed:search')}
        </p>
      </div>

      <div className='px-[35px] mt-[26px] h-[84px]'>
        <label className='relative'>
          <SearchIcon styles='absolute top-[-2.5px] w-[20px] h-[20px]' />
          <input
            className='text-xl p-2 pl-8 font-Helvetica-Neue-Geo w-full border-b border-b-gray-700 focus:border-b-gray-500 outline-none bg-transparent text-inputGray'
            placeholder={t('news-feed:search-by')}
            onChange={changeHandler}
          />
        </label>

        {inputValue.trim()[0] !== '@' &&
          inputValue.trim()[0] !== '#' &&
          inputValue.length > 0 && (
            <p className='animate-fade-in-delay text-xs text-orange pt-2'>
              {`${t('news-feed:enter')}`} <span>@</span>{' '}
              {`${t('news-feed:search-movies')}`}, {`${t('news-feed:enter')}`}{' '}
              <span>#</span> {`${t('news-feed:search-quotes')}`}
            </p>
          )}
      </div>

      {searchedPosts &&
        searchedPosts.map((quote) => {
          return <NewsFeedPost quote={quote} key={quote._id} />
        })}
    </div>
  )
}

export default MobileSearchBar
