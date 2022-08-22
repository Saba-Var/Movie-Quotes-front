import { useMobileSearchBar } from './useMobileSearchBar'
import { BackArrow, SearchIcon } from 'components'
import { MobileSearchBarProps } from './types.d'

const MobileSearchBar: React.FC<MobileSearchBarProps> = (props) => {
  const { setMobileSearchMode } = props

  const { t } = useMobileSearchBar()

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

      <div className='px-[52px] mt-[26px]'>
        <label className='relative'>
          <SearchIcon styles='absolute top-[13px] w-[20px] h-[20px]' />
          <input
            className='text-xl p-2 pl-8 font-Helvetica-Neue-Geo w-full border-b border-b-gray-600 outline-none bg-transparent text-inputGray'
            placeholder={t('news-feed:search')}
          />
        </label>
      </div>
    </div>
  )
}

export default MobileSearchBar
