import { useCommentInput } from './useCommentInput'
import { SendIcon, ErrorAlert } from 'components'
import { CommentInputProps } from './types.d'
import Image from 'next/image'

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const { quoteId, receiverId } = props

  const {
    inputChangeHandler,
    onSubmitHandler,
    setFetchError,
    commentText,
    fetchError,
    userData,
    t,
  } = useCommentInput(quoteId, receiverId)

  const userImageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return (
    <div className='flex items-center gap-4'>
      {fetchError && (
        <ErrorAlert
          setShowAlert={setFetchError}
          styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
          title='common:comment-fail'
        />
      )}

      {userData.image && (
        <div className='w-12 h-11 relative lg:w-[65px] lg:h-[60px]'>
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
        <div className='bg-slate-600 w-12 h-10 lg:w-[70px] lg:h-[60px] flex justify-center items-center rounded-full'>
          <p className='text-xl select-none pb-1 lg:text-3xl lg:pb-2 text-white'>
            {userData.name[0]}
          </p>
        </div>
      )}

      <form className='w-full relative' onSubmit={onSubmitHandler}>
        <input
          className='w-full px-4 py-[10px] pr-12 placeholder-medGray text-white text-base lg:text-xl bg-darkPurple h-10 rounded-[10px] xl:h-[52px] bg-opacity-60 outline-none'
          placeholder={t('common:write-comment')}
          onChange={inputChangeHandler}
          value={commentText}
        />

        <button type='submit'>
          <SendIcon />
        </button>
      </form>
    </div>
  )
}

export default CommentInput
