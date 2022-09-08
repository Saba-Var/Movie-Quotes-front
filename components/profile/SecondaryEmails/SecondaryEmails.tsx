import { useSecondaryEmails } from './useSecondaryEmails'
import { SecondaryEmailsProps } from './types.d'
import { InfoIcon, Tooltip } from 'components'

const SecondaryEmails: React.FC<SecondaryEmailsProps> = (props) => {
  const {
    setUserSecondaryEmails,
    userSecondaryEmails,
    setUserPrimaryEmail,
    setDeleteEmailList,
    userPrimaryEmail,
    setEmailChange,
    primaryEmail,
    email,
  } = props

  const { t, tooltip, setTooltip } = useSecondaryEmails()

  return (
    <div
      key={email._id}
      className='flex relative gap-1 animate-fade-in h-[94px]'
    >
      <div className='flex gap-4 items-center relative w-full'>
        <div className='relative w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px]'>
          {!email.verified && (
            <div
              className='absolute right-4 top-11 cursor-pointer'
              onMouseLeave={() => setTooltip(false)}
              onMouseOver={() => setTooltip(true)}
              data-tip='infoTip'
            >
              {tooltip && <Tooltip text={t('profile:tooltip-info')} />}
              <InfoIcon />
            </div>
          )}

          <p className='text-white mb-2 text-base font-Helvetica-Neue-Geo font-thin'>
            {t(`auth:email`)}
          </p>
          <div
            className={`bg-inputGray flex items-center h-[38px] pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-full border ${
              !email.verified &&
              'border border-darkYellow bg-darkYellow bg-opacity-20 !text-white'
            }`}
          >
            {email.email}
          </div>
        </div>

        <div className='flex gap-2 xl:gap-6 pt-7 lg:pt-8'>
          {email.verified ? (
            <p
              onClick={() => {
                setEmailChange(true)
                setUserSecondaryEmails((prev) => {
                  return [
                    ...prev.filter(
                      (secondaryEmails) => secondaryEmails.email !== email.email
                    ),

                    {
                      _id: new Date().toISOString(),
                      email: userPrimaryEmail,
                      verified: true,
                      notDeletable:
                        primaryEmail === userPrimaryEmail ? true : false,
                    },
                  ]
                })
                setUserPrimaryEmail(email.email)
              }}
              className='text-base 2xl:text-xl cursor-pointer transition-transform hover:scale-105 active:scale-100 font-Helvetica-Neue-Geo'
            >
              {t('profile:make-primary')}
            </p>
          ) : (
            <p className='text-base 2xl:text-xl cursor-default font-Helvetica-Neue-Geo'>
              {t('profile:not-verified')}
            </p>
          )}

          <div
            className={`w-[1px] bg-gray-600 ${
              email.notDeletable && '!opacity-0'
            }`}
          ></div>

          <p
            onClick={() => {
              if (!email.notDeletable) {
                setEmailChange(true)
                setDeleteEmailList((prev) => [...prev, email.email])
                setUserSecondaryEmails(
                  userSecondaryEmails.filter((el) => el._id !== email._id)
                )
              }
            }}
            className={`text-base 2xl:text-xl cursor-pointer transition-transform hover:scale-105 active:scale-100 font-Helvetica-Neue-Geo ${
              email.notDeletable && '!opacity-0 !cursor-default'
            }`}
          >
            {t('profile:remove')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecondaryEmails
