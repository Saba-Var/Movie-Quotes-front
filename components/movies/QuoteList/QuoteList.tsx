import { useQuoteList } from './useQuoteList'
import { QuoteListProps } from './types.d'
import Image from 'next/image'
import {
  QuoteDropdown,
  DeleteQuote,
  ErrorAlert,
  AddButton,
  EditQuote,
  ViewQuote,
  QuoteLike,
  ChatIcon,
  AddQuote,
} from 'components'

const QuoteList: React.FC<QuoteListProps> = (props) => {
  const { addQuoteModal, setAddQuoteModal } = props

  const {
    setViewQuoteModal,
    setDeleteModal,
    viewQuoteModal,
    setFetchError,
    setEditModal,
    deleteModal,
    setQuoteId,
    fetchError,
    editModal,
    quoteList,
    quoteId,
    locale,
    t,
  } = useQuoteList()

  return (
    <div className='w-[358px] sm:w-[438px] xl:w-[55%] pb-10'>
      {deleteModal && (
        <DeleteQuote quoteId={quoteId} setDeleteModal={setDeleteModal} />
      )}

      {fetchError && (
        <ErrorAlert
          styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
          title='common:quote-fetch-failed'
          setShowAlert={setFetchError}
        />
      )}

      {viewQuoteModal && (
        <ViewQuote
          setViewQuoteModal={setViewQuoteModal}
          setDeleteModal={setDeleteModal}
          setEditModal={setEditModal}
          quoteId={quoteId}
        />
      )}

      {editModal && (
        <EditQuote
          setDeleteModal={setDeleteModal}
          setEditModal={setEditModal}
          quoteId={quoteId}
        />
      )}

      {addQuoteModal && <AddQuote setAddQuoteModal={setAddQuoteModal} />}

      <div className='hidden xl:flex animate-fade-in mt-6 items-center gap-4'>
        <p className='text-2xl pr-4 border-r border-r-gray-600 text-white font-Helvetica-Neue-Geo'>{`${t(
          'news-feed:quotes'
        )} (${t('news-feed:total')} ${quoteList?.length})`}</p>
        <AddButton
          clickHandler={() => {
            setAddQuoteModal(true)
          }}
          title={t('news-feed:add-quote')}
        />
      </div>

      <div className='pt-10 mt-4 border-t border-t-gray-600'>
        <p className='text-2xl xl:hidden mb-8 pr-4 text-white font-Helvetica-Neue-Geo'>{`${t(
          'news-feed:quotes'
        )} (${t('news-feed:total')} ${quoteList?.length})`}</p>

        <div className='flex flex-col gap-8 xl:gap-10'>
          {quoteList &&
            quoteList?.map((quote) => {
              const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${quote?.image}`

              let quoteText = locale === 'en' ? quote.quoteEn : quote.quoteGe

              if (quoteText.length > 45) {
                quoteText = quoteText.slice(0, 45) + '...'
              }

              return (
                <div
                  key={quote._id}
                  className='flex h-[350px] animate-scale-up rounded-[10px] justify-between xl:!h-[268px] flex-col bg-formModalBlue py-4 xl:py-6 px-4 xl:px-8'
                >
                  {quote.likes && quote.comments && (
                    <>
                      <div className='flex flex-col relative xl:flex-row items-center gap-6 pb-6'>
                        <div
                          onClick={() => setQuoteId(quote._id)}
                          className='hidden xl:block xl:absolute top-0 right-0'
                        >
                          <QuoteDropdown
                            setViewQuoteModal={setViewQuoteModal}
                            setDeleteModal={setDeleteModal}
                            setEditModal={setEditModal}
                          />
                        </div>

                        <div className='hover:scale-[1.03] transition-transform relative w-full !h-36 xl:!h-[140px] xl:!w-56'>
                          <Image
                            className='animate-fold-out select-none rounded-sm round ed-xl'
                            loader={() => imageSrc}
                            unoptimized={true}
                            src={imageSrc}
                            layout='fill'
                            alt='movie'
                            priority
                          />
                        </div>
                        <p className='text-inputGray select-none animate-focus-in-text-expand w-full break-all text-2xl italic'>{`"${quoteText}"`}</p>
                      </div>

                      <div className='flex items-center justify-between pt-4 border-t border-t-gray-600'>
                        <div className='flex gap-6'>
                          <div className='flex items-center gap-4'>
                            <p className='text-white text-xl select-none'>
                              {quote.comments.length}
                            </p>
                            <ChatIcon />
                          </div>

                          <div className='flex items-center gap-4'>
                            <QuoteLike
                              receiverId={quote.user._id}
                              likes={quote.likes}
                              quoteId={quote._id}
                            />
                          </div>
                        </div>

                        <div
                          onClick={() => setQuoteId(quote._id)}
                          className='xl:hidden'
                        >
                          <QuoteDropdown
                            setViewQuoteModal={setViewQuoteModal}
                            setDeleteModal={setDeleteModal}
                            setEditModal={setEditModal}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default QuoteList
