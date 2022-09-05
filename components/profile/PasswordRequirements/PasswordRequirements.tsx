import { usePasswordRequirements } from './usePasswordRequirements'
import { PasswordRequirementsProps } from './types.d'

const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
  const { newPassword, lowerCaseError, mobileVersion } = props

  const { passwordSecondCondition, t } = usePasswordRequirements(
    newPassword,
    lowerCaseError
  )

  return (
    <div
      className={`w-full flex flex-col gap-5 justify-center border border-gray-700 px-8 mb-5 rounded-[4px] h-[200px] ${
        mobileVersion && 'bg-formModalBlue h-[150px]'
      }`}
    >
      <p className='text-white font-Helvetica-Neue-Geo text-base lg:text-xl'>
        {t('profile:password-contain')}:
      </p>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <div
            className={`w-1 h-1 bg-gray-400 rounded-full ${
              newPassword.trim().length >= 8 && 'bg-green'
            }`}
          ></div>

          <p
            className={`text-gray-400 ${
              newPassword.trim().length >= 8 && '!text-white'
            } text-sm lg:text-base font-Helvetica-Neue-Geo`}
          >
            {t('profile:password-min')}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div
              className={`w-1 h-1 bg-gray-400 rounded-full ${
                passwordSecondCondition && 'bg-green'
              }`}
            ></div>

            <p
              className={`${
                passwordSecondCondition && '!text-white'
              } text-gray-400 text-sm lg:text-base font-Helvetica-Neue-Geo`}
            >
              {t('profile:password-max')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordRequirements
