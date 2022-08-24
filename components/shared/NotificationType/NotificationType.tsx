import { CommentIcon, RedHeartIcon } from 'components'
import { NotificationTypeProps } from './types.d'

const NotificationType: React.FC<NotificationTypeProps> = (props) => {
  const { englishLan, time, timeUnit, type, title } = props

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-2 lg:gap-3'>
        {type === 'comment' && <CommentIcon />}
        {type === 'like' && <RedHeartIcon />}

        <p
          className={`${
            englishLan ? 'text-sm' : 'text-xs'
          } font-Helvetica-Neue-Geo text-inputGray lg:text-base xl:!text-xl`}
        >
          {title}...
        </p>
      </div>

      <p
        className={`${
          englishLan ? 'text-sm' : 'text-xs'
        } font-Helvetica-Neue-Geo text-inputGray text-base xl:hidden`}
      >
        {`${time} ${timeUnit}`}
      </p>
    </div>
  )
}

export default NotificationType
