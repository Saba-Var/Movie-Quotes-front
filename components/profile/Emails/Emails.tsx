import { SecondaryEmails, AuthInputField, CheckIcon } from 'components'
import { EmailsProps } from './types.d'

const Emails: React.FC<EmailsProps> = (props) => {
  const { primaryEmail, secondaryEmails } = props

  return (
    <div>
      <div className='flex flex-col mb-4  w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] relative'>
        <div className='h-[1px] bg-gray-700 w-full mb-12'></div>

        <AuthInputField
          styles='border border-green !bg-green placeholder:!text-white !bg-opacity-20'
          placeholder={primaryEmail}
          disabled={true}
          profile='yes'
          name='email'
          type='text'
        />
        <CheckIcon styles='absolute right-4 bottom-3' />
      </div>

      {secondaryEmails &&
        secondaryEmails?.length > 0 &&
        secondaryEmails.map((email) => {
          return <SecondaryEmails email={email} key={email._id} />
        })}
    </div>
  )
}

export default Emails
