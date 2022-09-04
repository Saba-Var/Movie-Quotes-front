import { useSaveChangesModal } from './useSaveChangesModal'
import { SaveChangesModalProps } from './types.d'
import { Button } from 'components'

const SaveChangesModal: React.FC<SaveChangesModalProps> = (props) => {
  const {
    closeModal,
    setFile,
    file,
    userId,
    setTypeError,
    typeError,
    setImageFetchError,
  } = props

  const { t, userImageUploadHandler } = useSaveChangesModal(
    setFile,
    file,
    userId,
    typeError,
    setTypeError,
    setImageFetchError
  )

  return (
    <div>
      <div className='bg-background overflow-hidden top-0 bg-opacity-70 fixed w-screen h-screen'></div>

      <div className='fixed z-[9999] w-full animate-scale-up'>
        <div className='w-[90%] bg-gradient-to-br border border-background from-darkBlack to-darkGray mx-auto rounded-xl h-52'>
          <p className='text-center pt-[68px] pb-11 border-b border-b-gray-700 font-Helvetica-Neue-Geo text-lg'>
            {t('profile:make-changes')}
          </p>

          <div className='flex justify-between items-center pt-3 px-[7%]'>
            <div
              className='text-xl cursor-pointer active:scale-100 transition-transform hover:scale-[1.03]'
              onClick={() => {
                if (setFile) {
                  setFile(null)
                } else {
                  closeModal && closeModal(false)
                }
              }}
            >
              {t('profile:cancel')}
            </div>

            <Button
              title={t(`profile:confirm`)}
              styles='bg-orange text-xl !px-2'
              type='submit'
              onClick={() => {
                if (file) {
                  userImageUploadHandler()
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaveChangesModal
