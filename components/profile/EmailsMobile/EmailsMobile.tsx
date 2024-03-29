import { useEmailsMobile } from './useEmailsMobile'
import { EmailsMobileProps } from './types.d'
import {
  SaveChangesModal,
  MobileForm,
  ErrorAlert,
  BackArrow,
  AlertList,
  CheckIcon,
  InfoIcon,
  AddIcon,
} from 'components'

const EmailsMobile: React.FC<EmailsMobileProps> = (props) => {
  const {
    setUserSecondaryEmails,
    setEmailsMobileModal,
    userSecondaryEmails,
    setUserPrimaryEmail,
    userPrimaryEmail,
    setUpdatedList,
    setEmailChange,
    updatedList,
    userEmail,
    userId,
  } = props

  const {
    primaryEmailChangeHandler,
    setDisableAddEmailModal,
    setChangePrimaryModal,
    setDeleteEmailModal,
    changePrimaryModal,
    setFailChangesFail,
    deleteEmailHandler,
    disableEmailModal,
    deleteEmailModal,
    saveChangesFail,
    setEmailId,
    t,
  } = useEmailsMobile(
    setUpdatedList,
    userEmail,
    setUserPrimaryEmail,
    userPrimaryEmail,
    userId,
    setUserSecondaryEmails,
    userSecondaryEmails,
    setEmailChange
  )

  return (
    <div className='fixed 1xl:hidden bg-background w-full h-full z-[9] pt-16 top-[80px]'>
      <div>
        <div onClick={() => setEmailsMobileModal(false)}>
          <BackArrow styles={'w-[18px] h-[18px] !top-[25px] !left-8'} />
        </div>

        {saveChangesFail && (
          <ErrorAlert
            styles='left-1/2 !-translate-x-1/2 !top-[12%] !z-[99999999999999]'
            setShowAlert={setFailChangesFail}
            title='profile:save-failed'
          />
        )}
      </div>

      {updatedList.length > 0 && (
        <AlertList setUpdatedList={setUpdatedList} updatedList={updatedList} />
      )}

      {deleteEmailModal && (
        <SaveChangesModal
          closeModal={() => {
            setEmailId(null)
            setDeleteEmailModal(false)
          }}
          styles='h-screen'
          userId={userId}
          saveHandler={deleteEmailHandler}
        />
      )}

      {changePrimaryModal && (
        <SaveChangesModal
          closeModal={() => {
            setEmailId(null)
            setUserPrimaryEmail(userEmail)
            setChangePrimaryModal(false)
          }}
          styles='h-screen'
          userId={userId}
          saveHandler={() => primaryEmailChangeHandler()}
        />
      )}

      {!disableEmailModal && (
        <div className='1xl:hidden'>
          <MobileForm
            closeForm={setDisableAddEmailModal}
            setUpdateList={setUpdatedList}
            userId={userId}
            type='email'
          />
        </div>
      )}

      <div className='bg-backgroundGray animate-slide-left py-9 pb-28 flex gap-8 overflow-y-auto flex-col h-full w-full px-8'>
        <div className='flex flex-col gap-5 pb-6 border-b border-b-gray-700'>
          <p className='font-Helvetica-Neue-Geo text-sm'>
            {t('profile:PRIMARY-EMAIL')}
          </p>

          <div className='h-[48px] justify-between relative font-Helvetica-Neue-Geo text-xl px-4 flex items-center w-full bg-green bg-opacity-20 rounded border border-green'>
            {userPrimaryEmail}
            <CheckIcon styles='!w-5 !h-5' />
          </div>
        </div>

        <div>
          {userSecondaryEmails?.length > 0 && (
            <p className='text-sm font-Helvetica-Neue-Geo mb-7 mt-9'>
              {t('profile:CHANGE-PRIMARY-EMAIL')}
            </p>
          )}

          <div className='flex flex-col gap-14'>
            {userSecondaryEmails &&
              userSecondaryEmails?.length > 0 &&
              userSecondaryEmails.map((email) => {
                return (
                  <div
                    key={email._id}
                    className='pb-6 border-b border-b-gray-700'
                  >
                    <p className='font-Helvetica-Neue-Geo text-xl pb-6'>
                      {email.email}
                    </p>

                    <div className='flex items-center justify-between'>
                      {!email.verified ? (
                        <div className='relative gap-2 flex items-center'>
                          <div className='relative'>
                            <InfoIcon />
                          </div>
                          <p className='text-base italic text-darkYellow'>
                            {t('profile:not-verified')}
                          </p>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEmailId(email._id)
                            setChangePrimaryModal(true)
                          }}
                          className='border border-white p-2 px-3 rounded font-Helvetica-Neue-Geo text-base'
                        >
                          {t('profile:make-this-primary')}
                        </div>
                      )}

                      <div
                        onClick={() => {
                          setEmailId(email._id)
                          setDeleteEmailModal(true)
                        }}
                        className='text-lg text-inputGray'
                      >
                        {t('profile:remove')}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <p className='text-white font-Helvetica-Neue-Geo'>
          {t('profile:ADD-NEW-EMAIL')}
        </p>

        <div
          onClick={() => {
            setDisableAddEmailModal(false)
          }}
          className='text-xl border py-1 border-white rounded flex justify-center items-center gap-2 text-white'
        >
          <AddIcon />
          <p>{t('profile:add')}</p>
        </div>
      </div>
    </div>
  )
}

export default EmailsMobile
