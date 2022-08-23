import { useNotifications } from './useNotifications'

const Notifications = () => {
  const { t, locale } = useNotifications()

  return (
    <>
      <div className='fixed animate-fade-in top-16 right-[33px] 1xl:right-[249px] 2xl:!right-[249px] 3xl:!right-[242px] md:right-[41px] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-formModalBlue'></div>

      <div className='z-[99999] h-screen animate-scale-up 1xl:h-[75vh] 1xl:w-[47%] 1xl:top-24 1xl:right-9 1xl:rounded-xl right-0 top-[86px] fixed w-full overflow-y-auto bg-formModalBlue'>
        <div className='w-full px-9 py-5'>
          <div className='flex justify-between items-center'>
            <p
              className={`${
                locale === 'ge'
                  ? 'text-base sm:text-xl 1xl:text-xl xl:!text-[28px]'
                  : 'text-xl 1xl:text-2xl xl:!text-[32px]'
              } text-white animate-fade-in cursor-default font-medium font-Helvetica-Neue-Geo`}
            >
              {t('common:notifications')}
            </p>

            <p
              className={`text-white ${
                locale === 'ge'
                  ? 'text-xs xl:text-base'
                  : 'text-sm 1xl:text-base xl:text-xl'
              } hover:scale-105 animate-fade-in transition-transform break-all active:scale-100 cursor-pointer font-Helvetica-Neue-Geo underline`}
            >
              {t('common:mark-read')}
            </p>
          </div>

          <p className='text-white mt-10 animate-fade-in font-Helvetica-Neue-Geo text-center font-medium text-xl'>
            {t('common:no-notifications')}
          </p>
        </div>
      </div>
    </>
  )
}

export default Notifications
