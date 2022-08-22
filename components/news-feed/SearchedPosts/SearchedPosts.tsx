import { useSearchedPosts } from './useSearchedPosts'
import { SearchedPostsProps } from './types.d'
import { NewsFeedPost } from 'components'

const SearchedPosts: React.FC<SearchedPostsProps> = (props) => {
  const { searchedPosts, fetchError } = props

  const { t } = useSearchedPosts()

  return (
    <div className='flex flex-col gap-7 overflow-x-hidden mt-[5%]'>
      {searchedPosts &&
        !fetchError &&
        searchedPosts.map((quote) => {
          return (
            <div key={quote._id}>
              <NewsFeedPost quote={quote} />
            </div>
          )
        })}

      {fetchError && (
        <p className='text-orange text-3xl text-center'>
          {t('common:fetch-failed')}
        </p>
      )}
    </div>
  )
}

export default SearchedPosts
