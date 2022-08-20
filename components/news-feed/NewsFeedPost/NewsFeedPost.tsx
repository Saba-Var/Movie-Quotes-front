import { NewsFeedPostProps } from './types.d'
import { UserImage } from 'components'
import Image from 'next/image'

const NewsFeedPost: React.FC<NewsFeedPostProps> = (props) => {
  const { quote } = props

  return (
    <div className='rounded-xl bg-formModalBlue animate-scale-up'>
      <UserImage image={quote.user.image!} name={quote.user.name} />
    </div>
  )
}

export default NewsFeedPost
