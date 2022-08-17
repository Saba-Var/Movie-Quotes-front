import { HeartIcon, WhiteHeartIcon, CloseIcon } from 'components'
import { useQuoteLike } from './useQuoteLike'
import { QuoteLikeProps } from './types.d'
import { useNewsFeed } from 'hooks'

const QuoteLike: React.FC<QuoteLikeProps> = (props) => {
  const { likes, quoteId } = props

  const { likeHandler, fetchError, setFetchError, t } = useQuoteLike()

  const { userData } = useNewsFeed()

  return (
    <>
      <p className='text-white text-xl'>{likes.length}</p>

      {likes.includes(userData._id) && (
        <div className='cursor-pointer animate-scale-up hover:scale-110 active:scale-100 transition-transform'>
          <WhiteHeartIcon />
        </div>
      )}

      {!likes.includes(userData._id) && (
        <div
          onClick={() => {
            likeHandler(quoteId, userData._id)
          }}
          className='cursor-pointer animate-scale-up hover:scale-110 active:scale-100 transition-transform'
        >
          <HeartIcon />
        </div>
      )}

      {fetchError && (
        <div className='flex items-center gap-2 bg-red-800 p-[2px] px-3 rounded-sm'>
          <p className='text-base font-medium'>{t('common:like-failed')}</p>

          <div
            className='cursor-pointer'
            onClick={() => {
              setFetchError(false)
            }}
          >
            <CloseIcon noStyle={true} />
          </div>
        </div>
      )}
    </>
  )
}

export default QuoteLike
