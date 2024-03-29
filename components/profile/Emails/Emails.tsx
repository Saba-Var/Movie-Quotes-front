import { SecondaryEmails, AuthInputField, CheckIcon, AddIcon } from 'components'
import { EmailsProps } from './types.d'
import { useEmails } from './useEmails'

const Emails: React.FC<EmailsProps> = (props) => {
  const {
    setUserSecondaryEmails,
    setUserPrimaryEmail,
    userSecondaryEmails,
    setDeleteEmailList,
    userPrimaryEmail,
    setAddEmailModal,
    setEmailChange,
    primaryEmail,
  } = props

  const { t } = useEmails()

  return (
    <div>
      <div className='flex flex-col mb-4 w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] relative'>
        <div className='h-[1px] hidden 1xl:block bg-gray-700 w-full mb-12'></div>

        <AuthInputField
          styles='border border-green !bg-green placeholder:!text-white !bg-opacity-20'
          placeholder={userPrimaryEmail}
          disabled={true}
          profile='yes'
          name='email'
          type='text'
        />
        <CheckIcon styles='absolute right-4 bottom-3' />
      </div>

      {userSecondaryEmails &&
        userSecondaryEmails?.length > 0 &&
        userSecondaryEmails.map((email) => {
          return (
            <SecondaryEmails
              setUserSecondaryEmails={setUserSecondaryEmails}
              setUserPrimaryEmail={setUserPrimaryEmail}
              userSecondaryEmails={userSecondaryEmails}
              setDeleteEmailList={setDeleteEmailList}
              userPrimaryEmail={userPrimaryEmail}
              notDeletable={email.notDeletable}
              setEmailChange={setEmailChange}
              primaryEmail={primaryEmail}
              key={email._id}
              email={email}
            />
          )
        })}

      <div
        className='flex items-center mt-6 xl:mt-12 h-[48px] gap-2 cursor-pointer hover:scale-[1.02] rounded-[4px] w-fit p-4 border border-white active:scale-100 transition-transform'
        onClick={() => setAddEmailModal(true)}
      >
        <AddIcon />
        <p className='text-white font-Helvetica-Neue-Geo text-base xl:text-xl'>
          {t('profile:add-email')}
        </p>
      </div>
    </div>
  )
}

export default Emails
