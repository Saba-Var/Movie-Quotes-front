import { useProfileFormWrapper } from './useProfileFormWrapper'
import { ProfileFormWrapperProps } from './types'

const ProfileFormWrapper: React.FC<ProfileFormWrapperProps> = (props) => {
  const { session } = useProfileFormWrapper()
  const { children } = props

  return (
    <div
      className={`bg-backgroundGray mt-14 !w-full 1xl:bg-formModalBlue 1xl:pt-48 1xl:mt-32 1xl:rounded-xl ${
        session && 'px-[10%]'
      } 2xl:mx-[10%] 1xl:block !1xl:w-[94%] 2xl:!w-[998px] pb-20`}
    >
      {children}
    </div>
  )
}

export default ProfileFormWrapper
