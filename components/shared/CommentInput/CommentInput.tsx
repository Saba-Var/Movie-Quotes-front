import { useCommentInput } from './useCommentInput'
import { CommentInputProps } from './types.d'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const { quoteId } = props

  const { userData } = useNewsFeed()

  const { t, inputChangeHandler, onSubmitHandler, commentText } =
    useCommentInput(quoteId, userData._id)

  const userImageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return (
    <div className='flex items-center gap-4'>
      {userData.image && (
        <div className='w-10 h-10 relative lg:w-[52px] lg:h-[52px]'>
          <Image
            className='rounded-full select-none'
            loader={() => userImageSrc}
            unoptimized={true}
            src={userImageSrc}
            alt='quote image'
            layout='fill'
            priority
          />
        </div>
      )}

      {!userData.image && (
        <div className='bg-green w-10 h-10 lg:w-[60px] lg:h-[60px] flex justify-center items-center rounded-full'>
          <p className='text-3xl pb-2'>{userData.name[0]}</p>
        </div>
      )}

      <form className='w-full' onSubmit={onSubmitHandler}>
        <input
          className='w-full px-4 py-[10px] placeholder-inputGray text-2xl bg-darkPurple h-10 rounded-[10px] xl:h-[52px] opacity-60 outline-none'
          placeholder={t('common:write-comment')}
          onChange={inputChangeHandler}
          value={commentText}
        />
      </form>
    </div>
  )
}

export default CommentInput
