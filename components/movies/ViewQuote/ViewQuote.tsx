import { useViewQuote } from './useViewQuote'
import { ViewQuoteProps } from './types.d'
import { CommentType } from 'types'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'
import {
  CommentInput,
  PencilIcon,
  TrashIcon,
  CloseIcon,
  QuoteLike,
  ChatIcon,
} from 'components'

const ViewQuote: React.FC<ViewQuoteProps> = (props) => {
  const { setViewQuoteModal, quoteId, setDeleteModal, setEditModal } = props

  const { currentQuote, t, quoteImageSrc } = useViewQuote(quoteId)
  const { userData } = useNewsFeed()

  return (
    <>
      <div
        className={`fixed w-full h-screen bg-background opacity-80 left-0  top-0 z-[99999]`}
        onClick={() => {
          setViewQuoteModal(false)
        }}
      ></div>

      <div
        className={`fixed right-0 top-0 w-screen z-[99999] animate-fade-in !rounded-[12px] bg-formModalBlue h-screen 1xl:!h-fit pb-2 1xl:w-[50vw] 1xl:left-[28%] 1xl:top-10 3xl:top-24`}
      >
        <div className='flex justify-between items-center py-7 border-b border-b-gray-600'>
          <div className='flex gap-4 pl-8'>
            <div
              onClick={() => {
                setViewQuoteModal(false)
                setEditModal(true)
              }}
            >
              <PencilIcon />
            </div>
            <div className='bg-white w-[1px]'></div>
            <div
              onClick={() => {
                setViewQuoteModal(false)
                setDeleteModal(true)
              }}
            >
              <TrashIcon />
            </div>
          </div>

          <p className='hidden sm:block text-white text-2xl font-Helvetica-Neue-Geo font-medium'>
            {t('movies:view-quote')}
          </p>

          <div
            onClick={() => setViewQuoteModal(false)}
            className='pr-8 cursor-pointer'
          >
            <CloseIcon noStyle={true} />
          </div>
        </div>

        <div className='!overflow-y-scroll h-[80vh]'>
          <div className='px-8 flex flex-col my-7'>
            <div className='flex items-center gap-4'>
              {userData.image && (
                <div className='w-10 h-10 relative lg:w-[60px] lg:h-[60px]'>
                  <Image
                    className='rounded-full select-none'
                    loader={() =>
                      `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`
                    }
                    unoptimized={true}
                    alt='quote image'
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`}
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

              <p className='text-white text-xl cursor-default'>
                {userData.name}
              </p>
            </div>

            <div className='border cursor-default border-gray-600 mt-8 rounded relative'>
              <p className='text-inputGray p-2 overflow-y-auto pr-12 h-[86px] text-xl lg:text-2xl whitespace-pre-wrap break-words'>{`"${currentQuote?.quoteEn}"`}</p>
              <span className='text-medGray absolute top-2 lg:text-xl right-3 text-base'>
                Eng
              </span>
            </div>

            <div className='border cursor-default border-gray-600 mt-8 rounded relative'>
              <p className='text-inputGray p-2 overflow-y-auto pr-12 h-[86px] text-xl lg:text-2xl whitespace-pre-wrap break-words'>{`"${currentQuote?.quoteGe}"`}</p>
              <span className='text-medGray absolute top-2 lg:text-xl right-3 text-base'>
                ქარ
              </span>
            </div>

            {currentQuote?.image && (
              <div className='relative w-[358px h-[302px] lg:h-[450px] mt-6 2xl:h-[513px]'>
                <Image
                  className='rounded-[10px] select-none'
                  loader={() => quoteImageSrc}
                  src={quoteImageSrc}
                  unoptimized={true}
                  alt='quote image'
                  layout='fill'
                  priority
                />
              </div>
            )}

            <div className='flex gap-6 items-center mt-7 xl:mt-8 lg:!border-b-0 border-b border-b-gray-600 pb-4 mb-4'>
              <div className='items-center flex gap-3'>
                <p className='text-white text-xl'>
                  {currentQuote?.comments.length}
                </p>
                <ChatIcon />
              </div>

              <div className='items-center flex gap-3'>
                {currentQuote?.likes && currentQuote._id && (
                  <QuoteLike
                    likes={currentQuote?.likes}
                    quoteId={currentQuote?._id}
                  />
                )}
              </div>
            </div>

            <div className='gap-4 flex flex-col xl:gap-6'>
              {currentQuote?.comments.map((comment: CommentType) => {
                return (
                  <div key={comment._id} className='pb-6 flex gap-5 xl:gap-6'>
                    <div className=''>
                      {comment.user.image && (
                        <div className='w-10 h-10 relative lg:w-[52px] lg:h-[52px]'>
                          <Image
                            className='rounded-full select-none'
                            loader={() =>
                              `${process.env.NEXT_PUBLIC_API_BASE_URI}/${comment.user.image}`
                            }
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URI}/${comment.user.image}`}
                            unoptimized={true}
                            alt='user image'
                            layout='fill'
                            priority
                          />
                        </div>
                      )}

                      {!comment.user.image && (
                        <div className='bg-green w-10 h-10 lg:w-[52px] lg:h-[52px] flex justify-center items-center rounded-full'>
                          <p className='text-3xl pb-2'>{userData.name[0]}</p>
                        </div>
                      )}
                    </div>

                    <div className='flex border-b w-full pb-6 border-b-gray-500 flex-col pt-2 lg:pt-4 xl:pt-2 gap-4'>
                      <p className='text-xl xl:text-2xl text-white font-Helvetica-Neue-Geo font-medium'>
                        {comment.user.name}
                      </p>

                      <p className='break-all text-white text-xl whitespace-pre-wrap !w-full'>
                        {comment.commentText}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className={`${
                currentQuote && currentQuote?.comments.length > 0 && 'mt-4'
              }`}
            >
              {currentQuote?._id && <CommentInput quoteId={currentQuote._id} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewQuote
