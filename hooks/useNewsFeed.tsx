import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { getNewsFeedPost } from 'services'
import { useRouter } from 'next/router'
import { Quotes } from 'types'
import {
  useDislikeQuote,
  useCommentQuote,
  useDeleteMovie,
  useDeleteQuote,
  useLikeQuote,
  useEditQuote,
} from 'hooks'

export const useNewsFeed = () => {
  const [searchedPosts, setSearchedPosts] = useState<Quotes>([])

  const [showSideMenu, setShowSideMenu] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const { t } = useTranslation()
  const router = useRouter()

  const navigate = (routeUri: string) => {
    router.push(`/${routeUri}`)
  }

  useCommentQuote(searchedPosts, setSearchedPosts)
  useDislikeQuote(searchedPosts, setSearchedPosts)
  useDeleteQuote(searchedPosts, setSearchedPosts)
  useDeleteMovie(searchedPosts, setSearchedPosts)
  useEditQuote(searchedPosts, setSearchedPosts)
  useLikeQuote(searchedPosts, setSearchedPosts)

  const fetchSearchedPosts = useCallback(
    async (searchValue: string) => {
      if (
        (searchValue.trim()[0] === '@' || searchValue.trim()[0] === '#') &&
        searchValue.length > 1
      ) {
        try {
          const response = await getNewsFeedPost(
            searchValue.includes('#')
              ? `%23${searchValue.slice(1)}`
              : searchValue
          )

          if (response.status === 200) {
            if (fetchError) {
              setFetchError(false)
            }
            setSearchedPosts(response.data)
          }
        } catch (error) {
          setFetchError(true)
        }
      }
    },
    [fetchError]
  )

  useEffect(() => {
    fetchSearchedPosts(inputValue)
  }, [fetchSearchedPosts, inputValue])

  return {
    setShowSideMenu,
    setInputValue,
    searchedPosts,
    showSideMenu,
    inputValue,
    fetchError,
    navigate,
    t,
  }
}
