import { useNewQuote } from './useNewQuote'
import { EditIcon } from 'components'

const NewQuote = () => {
  const { t } = useNewQuote()

  return (
    <div className='lg:bg-backgroundGray rounded-lg'>
      <div className='w-fit flex gap-3 cursor-pointer pt-1 lg:py-3 pl-4 hover:scale-[1.03] active:scale-100 transition-transform'>
        <EditIcon />
        <p className='text-white select-none font-Helvetica-Neue-Geo text-xl'>
          {t('news-feed:write-quote')}
        </p>
      </div>
    </div>
  )
}

export default NewQuote
