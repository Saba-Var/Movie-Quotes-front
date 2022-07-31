import { useLogIn } from './useLogIn'
import React from 'react'

const LogIn: React.FC<any> = (props) => {
  const { t } = useLogIn()

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-[9999] bg-darkGray`}
        onClick={() => {
          props.setShowLogIn(false)
        }}
      ></div>
      <div
        className={`fixed h-[732px] w-full md:w-[601px] md:h-[704px] z-[99999] left-1/2 -translate-x-1/2 2.5xl:top-[10%]`}
      >
        <div
          className={`h-screen animate-scale-up md:h-[750px] rounded-xl bg-darkBlue pt-7 sm:pt-14 px-8 md:px-[121px]`}
        >
          <div className='flex animate-focus-in-text-expand flex-col gap-3 justify-center items-center'>
            <p className='text-white font-Helvetica-Neue-Geo text-2xl font-medium '>
              {t('registration:log-into')}
            </p>
            <h2 className='text-white text-3xl mt-10'>Form add soon!</h2>
            <div className='text-blue cursor-pointer hover:scale-110 transition-transform text-base underline font-Helvetica-Neue-Geo'>
              {t('registration:forgot-password')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LogIn
