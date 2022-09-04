import { useProfileFormWrapper } from './useProfileFormWrapper'
import { ProfileFormWrapperProps } from './types'
import { BackArrow } from 'components'

const ProfileFormWrapper: React.FC<ProfileFormWrapperProps> = (props) => {
  const { children } = props

  const { session, navigateBack } = useProfileFormWrapper()

  return (
    <div
      className={`bg-backgroundGray !w-full 1xl:bg-formModalBlue 1xl:!pt-48 1xl:mt-32 1xl:rounded-xl 2xl:mx-[10%] 1xl:block !1xl:w-[94%] 2xl:!w-[998px] pb-20`}
    >
      <div className='h-14 bg-darkBlue 1xl:hidden flex items-center pl-8'>
        <div onClick={navigateBack}>
          <BackArrow clearStyles={true} styles={'w-[18px] h-[18px]'} />
        </div>
      </div>

      <div className={`${session && '!px-[10%]'}`}>{children}</div>
    </div>
  )
}

export default ProfileFormWrapper
