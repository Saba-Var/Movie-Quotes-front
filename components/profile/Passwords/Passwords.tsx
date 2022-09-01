import { AuthInputField, EditInput } from 'components'
import { usePasswords } from './usePasswords'
import { PasswordsProps } from './types.d'

const Passwords: React.FC<PasswordsProps> = (props) => {
  const {
    setDisablePassword,
    disablePassword,
    lowerCaseError,
    passwordLength,
    newPassword,
  } = props

  const { t, passwordSecondCondition } = usePasswords(
    newPassword.trim(),
    lowerCaseError
  )

  return (
    <div className='flex flex-col mb-4  w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] relative'>
      <div className='h-[1px] bg-gray-700 w-full mb-12 mt-12'></div>

      <div className='h-[94px] relative'>
        <div className='flex flex-col gap-1 animate-fade-in'>
          <div className='flex flex-col gap-2 relative'>
            <label className='text-white text-base font-Helvetica-Neue-Geo font-thin'>
              {t(`auth:password`)}
            </label>
            <input
              className={`bg-inputGray pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-full border h-[38px]`}
              defaultValue={'#'.repeat(passwordLength)}
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
          <div className='w-full flex flex-col gap-5 justify-center border border-gray-700 px-8 mb-5 rounded-[4px] h-[200px]'>
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

          <div className='h-[94px]'>
            <AuthInputField
              placeholder={t('auth:password-reqs')}
              type='password'
              name='password'
              profile='yes'
            />
          </div>

          <div className='h-[94px]'>
            <AuthInputField
              placeholder={t('auth:confirmPassword')}
              name='confirmPassword'
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
