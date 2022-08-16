import { Button, DeleteDialogWrapper } from 'components'
import { useDeleteQuote } from './useDeleteQuote'
import { DeleteQuoteProps } from './types.d'

const DeleteQuote: React.FC<DeleteQuoteProps> = (props) => {
  const { setDeleteModal, quoteId } = props

  const { t, deleteHandler } = useDeleteQuote(quoteId, setDeleteModal)

  return (
    <DeleteDialogWrapper
      question={t('news-feed:delete-quote-question')}
      setDeleteDialogWrapper={setDeleteModal}
      title={t('news-feed:delete-quote')}
    >
      <div className='flex justify-center gap-12 mt-12'>
        <Button
          onClick={() => setDeleteModal(false)}
          styles='bg-gray-400 1xl:!text-xl w-[100px]'
          title={t('common:no')}
          type='button'
        />

        <Button
          onClick={() => deleteHandler()}
          styles='bg-orange 1xl:!text-xl w-[100px]'
          title={t('common:yes')}
          type='button'
        />
      </div>
    </DeleteDialogWrapper>
  )
}

export default DeleteQuote
