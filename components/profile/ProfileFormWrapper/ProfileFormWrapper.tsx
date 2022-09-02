import { useProfileFormWrapper } from './useProfileFormWrapper'
import { ProfileFormWrapperProps } from './types'

const ProfileFormWrapper: React.FC<ProfileFormWrapperProps> = (props) => {
  const { session } = useProfileFormWrapper()
  const { children } = props

  return (
    <div
      className={`bg-formModalBlue pt-48 mt-32 rounded-xl hidden ${
        session && 'px-[10%]'
      } 2xl:mx-[10%] 1xl:block w-[94%] 2xl:w-[998px] pb-20`}
    >
      {children}
    </div>
  )
}

export default ProfileFormWrapper
