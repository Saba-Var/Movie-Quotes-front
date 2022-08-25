import { UserImage, QuoteLike, CommentInput, ChatIcon } from 'components'
import { useNewsFeedPost } from './useNewsFeedPost'
import { NewsFeedPostProps } from './types.d'
import Image from 'next/image'

const NewsFeedPost: React.FC<NewsFeedPostProps> = (props) => {
  const { quote } = props

  const { locale, imageSrc, t } = useNewsFeedPost(quote.image!)

  return (
    <div className='rounded-xl bg-formModalBlue animate-scale-up py-7 px-9'>
      <div className='animate-fade-in'>
        <UserImage
          imageStyles={'lg:w-[52px] lg:h-[52px]'}
          image={quote.user.image!}
          name={quote.user.name}
        />
      </div>

      {quote.quoteEn && (
        <div className='mt-[14px] mb-4 lg:mt-4 lg:mb-7 animate-fade-in'>
          <p className='text-white animate-fade-in text-base lg:text-xl font-Helvetica-Neue-Geo'>
            {`“${locale === 'en' ? quote.quoteEn : quote.quoteGe}“. ${t(
              'news-feed:movie'
            )}-`}
            {quote.movie && (
              <span className='text-lightGold'>
                {locale === 'en'
                  ? quote.movie.movieNameEn
                  : quote.movie.movieNameGe}
              </span>
            )}
          </p>
        </div>
      )}

      <div className='relative mb-[19px] lg:mb-6 h-56 sm:h-[300px] lg:h-[400px] xl:h-[500px]'>
        <Image
          className='animate-fade-in rounded-[10px]'
          loader={() => imageSrc}
          unoptimized={true}
          src={imageSrc}
          layout='fill'
          alt='movie'
          priority
        />
      </div>

      <div className='flex items-center gap-6 pb-[19px] mb-4 lg:mb-6 lg:pb-6 border-b border-b-gray-600'>
        <div className='flex items-center gap-3'>
          <p className='text-white select-none text-xl cursor-default'>
            {quote.comments.length}
          </p>
          <ChatIcon />
        </div>

        <div className='flex items-center gap-3'>
          <QuoteLike
            receiverId={quote.user._id}
            likes={quote.likes}
            quoteId={quote._id}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4 xl:gap-6 mb-4 xl:mb-6'>
        {quote.comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className='flex flex-col gap-3 animate-scale-up '
            >
              <UserImage
                image={comment.user.image!}
                name={comment.user.name}
                imageStyles={'h-[40px] w-[40px] lg:w-[52px] lg:h-[52px]'}
              />

              <div className='pl-14 lg:pl-[75px]'>
                <p className='break-words pb-6 border-b border-b-gray-600 whitespace-pre-wrap text-white lg:text-xl font-Helvetica-Neue-Geo text-base'>
                  {comment.commentText}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <CommentInput receiverId={quote.user._id} quoteId={quote._id} />
    </div>
  )
}

export default NewsFeedPost
