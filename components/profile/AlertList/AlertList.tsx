import { useAlertList } from './useAlertList'
import { AlertListProps } from './types.d'
import { SuccessAlert } from 'components'

const AlertList: React.FC<AlertListProps> = (props) => {
  const { setUpdatedList, updatedList } = props
  const { t } = useAlertList()

  return (
    <div className='fixed 1xl:top-32 max-h-[65vh] overflow-y-auto xl:!top-44 xl:pr-[3%] 1xl:!items-end  flex gap-4 flex-col w-full 1xl:!w-fit right-0 z-[9]'>
      <div className='1xl:hidden h-screen w-full opacity-60 left-0 fixed bg-background top-24'></div>

      {updatedList.map((item) => {
        if (item.type === 'email-updated') {
          return (
            <SuccessAlert
              instructions={t(`profile:update-email`)}
              headerText={t(`profile:update-alert`)}
              setUpdatedList={setUpdatedList}
              key={item.id}
              id={item.id}
            />
          )
        } else {
          return (
            <SuccessAlert
              headerText={t(`profile:${item.type}`)}
              setUpdatedList={setUpdatedList}
              key={item.id}
              id={item.id}
            />
          )
        }
      })}
    </div>
  )
}

export default AlertList
