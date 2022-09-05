import { AuthInputField, EditInput, PasswordRequirements } from 'components'
import { usePasswords } from './usePasswords'
import { PasswordsProps } from './types.d'

const Passwords: React.FC<PasswordsProps> = (props) => {
  const { setDisablePassword, disablePassword, lowerCaseError, newPassword } =
    props

  const { t } = usePasswords()

  return (
    <div className='flex flex-col mb-4  w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] relative'>
      <div className='h-[1px] hidden 1xl:block bg-gray-700 w-full mb-12 mt-12'></div>

      <div className='h-[94px] relative'>
        <div className='flex flex-col gap-1 animate-fade-in'>
          <div className='flex flex-col gap-2 relative'>
            <label className='text-white text-base font-Helvetica-Neue-Geo font-thin'>
              {t(`auth:password`)}
            </label>
            <input
              className={`bg-inputGray pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-full border h-[38px]`}
              defaultValue={'#'.repeat(10)}
              type={'password'}
              disabled={true}
            />
          </div>
        </div>

        {disablePassword && (
          <EditInput
            clickHandler={() => {
              setDisablePassword(false)
            }}
            text={t('profile:edit')}
          />
        )}
      </div>

      {!disablePassword && (
        <div className='relative w-full flex flex-col gap-3 mt-5 animate-scale-up'>
          <PasswordRequirements
            lowerCaseError={lowerCaseError}
            newPassword={newPassword}
          />

          <div className='h-[94px]'>
            <AuthInputField
              placeholder={t('auth:password-reqs')}
              styles='profileInputStyles'
              error='1xl:!right-8'
              valid='1xl:!right-8'
              type='password'
              name='password'
              profile='yes'
            />
          </div>

          <div className='h-[94px]'>
            <AuthInputField
              placeholder={t('auth:confirmPassword')}
              styles='profileInputStyles'
              name='confirmPassword'
              error='1xl:!right-8'
              valid='1xl:!right-8'
              type='password'
              profile='yes'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Passwords
