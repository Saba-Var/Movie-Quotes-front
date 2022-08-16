import { ThreeDotsIcon, PencilIcon, TrashIcon, ViewEyeIcon } from 'components'
import { useQuoteDropdown } from './useQuoteDropdown'
import { QuoteDropdownProps } from './types.d'

const QuoteDropdown: React.FC<QuoteDropdownProps> = (props) => {
  const { setDeleteModal } = props

  const { t, setShowDropDown, showDropDown } = useQuoteDropdown()

  return (
    <div className='relative z-[99]'>
      <div
        className='h-6 flex cursor-pointer justify-center items-center w-6'
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <ThreeDotsIcon />
      </div>

      {showDropDown && (
        <>
          <div className='flex absolute top-[-210px] animate-scale-up xl:animate-dropdown -left-10 xl:top-7 xl:-left-9 items-left justify-center flex-col pl-10 gap-9 bg-backgroundGray w-[249px] h-[200px] rounded-[10px]'>
            <div
              onClick={() => setShowDropDown(false)}
              className='flex cursor-pointer hover:scale-[1.025] transition-transform gap-4 items-center'
            >
              <ViewEyeIcon />
              <p>{t('news-feed:view-post')}</p>
            </div>

            <div
              onClick={() => setShowDropDown(false)}
              className='flex cursor-pointer hover:scale-[1.025] transition-transform gap-4 items-center'
            >
              <PencilIcon />
              <p>{t('news-feed:edit')}</p>
            </div>

            <div
              onClick={() => {
                setDeleteModal(true)
                setShowDropDown(false)
              }}
              className='flex cursor-pointer hover:scale-[1.025] transition-transform gap-4 items-center'
            >
              <TrashIcon />
              <p>{t('news-feed:delete')}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default QuoteDropdown
