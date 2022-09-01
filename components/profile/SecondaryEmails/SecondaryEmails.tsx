import { useSecondaryEmails } from './useSecondaryEmails'
import { SecondaryEmailsProps } from './types.d'
import { InfoIcon } from 'components'

const SecondaryEmails: React.FC<SecondaryEmailsProps> = (props) => {
  const {
    email,
    setUserPrimaryEmail,
    setEmailChange,
    userPrimaryEmail,
    setUserSecondaryEmails,
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
              {tooltip && (
                <div className='absolute px-2 gap-2 -top-24 animate-scale-up -right-36 items-center flex w-[280px] h-[56px] text-gray-700 rounded-[4px] bg-white'>
                  <div className='absolute animate-scale-up right-[102px] top-4 z-[-1] w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[50px] border-t-white'></div>
                  <div className='flex gap-2 items-center'>
                    <InfoIcon color='gray' styles='!w-5 !h-5' />
                    <p className='text-base'>{t('profile:tooltip-info')}</p>
                  </div>
                </div>
              )}
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

          <div className='w-[1px] bg-gray-600'></div>

          <p className='text-base 2xl:text-xl cursor-pointer transition-transform hover:scale-105 active:scale-100 font-Helvetica-Neue-Geo'>
            {t('profile:remove')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecondaryEmails
