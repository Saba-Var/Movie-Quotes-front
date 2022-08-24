import { NotificationType, UserImage, ErrorAlert } from 'components'
import { useNotifications } from './useNotifications'
import { timeDifference } from 'helpers'

const Notifications = () => {
  const {
    setNotificationFetchFail,
    notificationFetchFail,
    hasMoreNotifications,
    notificationsList,
    englishLan,
    setPage,
    page,
    t,
  } = useNotifications()

  return (
    <>
      <div className='fixed animate-fade-in top-16 right-[33px] 1xl:right-[249px] 3xl:!right-[242px] md:right-[41px] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-formModalBlue'></div>

      {notificationFetchFail && (
        <ErrorAlert
          setShowAlert={setNotificationFetchFail}
          styles='left-1/2 !-translate-x-1/2 1xl:left-[50%]'
          title='common:notification-fetch-fail'
        />
      )}

      <div className='z-[99999] h-screen animate-scale-up 1xl:h-[72vh] 1xl:w-[47%] 1xl:top-24 1xl:right-9 1xl:rounded-xl right-0 top-[86px] fixed w-full overflow-y-auto bg-formModalBlue'>
        <div className='w-full px-9 py-5'>
          <div className='flex justify-between items-center'>
            <p
              className={`${
                englishLan
                  ? 'text-base sm:text-xl 1xl:text-xl xl:!text-[28px]'
                  : 'text-xl 1xl:text-2xl xl:!text-[32px]'
              } text-white animate-fade-in cursor-default font-medium font-Helvetica-Neue-Geo`}
            >
              {t('common:notifications')}
            </p>

            <p
              className={`text-white ${
                englishLan
                  ? 'text-xs xl:text-base'
                  : 'text-sm 1xl:text-base xl:text-xl'
              } hover:scale-105 animate-fade-in transition-transform break-all active:scale-100 cursor-pointer font-Helvetica-Neue-Geo underline`}
            >
              {t('common:mark-read')}
            </p>
          </div>

          {notificationsList.length === 0 && (
            <p className='text-white mt-10 animate-fade-in font-Helvetica-Neue-Geo text-center font-medium text-xl'>
              {t('common:no-notifications')}
            </p>
          )}

          <div className='flex flex-col h-full gap-2 1xl:gap-3 lg:gap-4 mt-6 pb-24 1xl:pb-0'>
            {notificationsList.length > 0 &&
              notificationsList.map((notification) => {
                const { time, timeUnit } = timeDifference(
                  new Date(notification.date)
                )

                return (
                  <div
                    className={`border border-gray-700 ${
                      englishLan ? 'p-4' : 'p-2'
                    } rounded sm:p-4 h-[121px] 1xl:h-fit`}
                    key={notification._id}
                  >
                    <div className='flex gap-3 xl:justify-between'>
                      <div className='flex gap-3 xl:items-center'>
                        <div className='flex flex-col items-center'>
                          <UserImage
                            imageStyles='w-[60px] h-[60px] xl:h-[80px] xl:w-[80px]'
                            newNotification={notification.new}
                            image={notification.user.image}
                            name={notification.user.name}
                            notificationImage={true}
                          />

                          {notification.new && (
                            <div className='flex xl:hidden'>
                              <p className={`text-green`}>{t('common:new')}</p>
                            </div>
                          )}
                        </div>

                        <div className='flex flex-col gap-1 font-Helvetica-Neue-Geo text-white text-xl'>
                          <p className='text-white font-Helvetica-Neue-Geo font-medium text-xl'>
                            {notification.user.name}
                          </p>

                          {notification.notificationType === 'comment' && (
                            <NotificationType
                              timeUnit={t(`common:${timeUnit}`)}
                              title={t('common:commented')}
                              englishLan={englishLan}
                              time={time}
                              type='comment'
                            />
                          )}

                          {notification.notificationType === 'like' && (
                            <NotificationType
                              timeUnit={t(`common:${timeUnit}`)}
                              title={t('common:reacted')}
                              englishLan={englishLan}
                              time={time}
                              type='like'
                            />
                          )}
                        </div>
                      </div>

                      <div className='xl:flex flex-col pt-3 items-end hidden'>
                        <p
                          className={`font-Helvetica-Neue-Geo text-inputGray text-base`}
                        >
                          {`${time} ${t(`common:${timeUnit}`)}`}
                        </p>

                        {notification.new && (
                          <div className='hidden xl:block'>
                            <p className='text-green text-xl'>
                              {t('common:new')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

            {hasMoreNotifications && (
              <p
                onClick={() => {
                  setPage(page + 1)
                }}
                className='text-blue mt-3 text-2xl text-center cursor-pointer hover:scale-105 transition-transform active:scale-100'
              >
                Load more
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
