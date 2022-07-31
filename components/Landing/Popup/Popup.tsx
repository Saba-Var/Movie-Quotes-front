import { PlanIcon, CorrectIcon } from 'components'
import { usePopup } from './usePopup'
import { PopupProps } from './types'

const Popup: React.FC<PopupProps> = (props) => {
  const { setShowPopupModal, type } = props

  const { popupCloseHandler, t, buttonTitle, info, actionUri, locale } =
    usePopup(setShowPopupModal, type)

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-[9999] bg-darkGray`}
        onClick={popupCloseHandler}
      ></div>
      <div
        className={`fixed w-[360px] h-[414px] md:w-[538px] z-[99999] left-1/2 -translate-x-1/2 top-[18%]`}
      >
        <div
          className={`h-[414px] ${locale === 'ge' && 'h-[440px]'} ${
            type !== 'activate' && '!h-[388px] md:!h-[375px]'
          } pt-[72px] pb-[105px] md:pb-[76px] w-[360px] md:w-[538px] animate-scale-up rounded-xl bg-darkBlue`}
        >
          <div className='w-full h-full flex flex-col items-center gap-5 md:gap-6'>
            <div className='flex flex-col justify-between items-center gap-4 md:gap-5'>
              {type === 'activate' && <PlanIcon />}
              {type !== 'activate' && <CorrectIcon />}
              <p className='text-2xl animate-focus-in-text-expand text-white md:text-[32px] font-Helvetica-Neue-Geo font-medium'>
                {t('auth:thank')}
              </p>
            </div>

            <div className='flex flex-col justify-between items-center gap-6 md:gap-10'>
              <p className='text-center animate-fade-in w-72 md:w-96 text-base text-white font-Helvetica-Neue-Geo'>
                {t(`auth:${info}`)}
              </p>
              <a
                className={`bg-orange w-[190px] px-10 ${
                  locale === 'ge' && 'px-2'
                } ${
                  type !== 'activate' && 'w-[200px] px-1'
                } active:scale-95 py-2 cursor-pointer hover:scale-105 transition-transform rounded font-medium font-Helvetica-Neue-Geo text-center md:w-96 text-white text-base`}
                href={actionUri}
              >
                {t(`auth:${buttonTitle}`)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Popup
