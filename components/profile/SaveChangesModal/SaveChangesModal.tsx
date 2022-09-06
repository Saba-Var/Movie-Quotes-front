import { useSaveChangesModal } from './useSaveChangesModal'
import { SaveChangesModalProps } from './types.d'
import { Button, ErrorAlert } from 'components'

const SaveChangesModal: React.FC<SaveChangesModalProps> = (props) => {
  const {
    setPasswordErrorAlert,
    setImageFetchError,
    passwordErrorAlert,
    setUpdatedList,
    setTypeError,
    saveHandler,
    closeModal,
    typeError,
    setFile,
    userId,
    styles,
    file,
  } = props

  const { t, userImageUploadHandler } = useSaveChangesModal(
    setFile,
    file,
    userId,
    typeError,
    setTypeError,
    setImageFetchError,
    setUpdatedList
  )

  return (
    <div>
      <div className='bg-background overflow-hidden top-0 bg-opacity-70 fixed w-screen h-screen'></div>

      <div
        className={`fixed z-[9999] top-20 pt-14 bg-background w-full animate-scale-up ${styles}`}
      >
        {passwordErrorAlert && (
          <ErrorAlert
            styles='left-1/2 !-translate-x-1/2 1xl:left-[62%] z-[999999999999999]'
            title='profile:password-update-failed'
            setShowAlert={setPasswordErrorAlert!}
          />
        )}

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
                }

                if (passwordErrorAlert) {
                  setPasswordErrorAlert && setPasswordErrorAlert(false)
                }

                closeModal && closeModal(false)
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

                saveHandler && saveHandler()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaveChangesModal
