import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getNewsFeedPost } from 'services'
import { Quotes } from 'types'
import {
  useCommentQuote,
  useDislikeQuote,
  useDeleteQuote,
  useDeleteMovie,
  useEditQuote,
  useLikeQuote,
} from 'hooks'

export const useMobileSearchBar = () => {
  const [searchedPosts, setSearchedPosts] = useState<Quotes>([])

  const [fetchError, setFetchError] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const { t } = useTranslation()

  const validInput =
    (inputValue.trim()[0] === '@' || inputValue.trim()[0] === '#') &&
    inputValue.length > 1

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)

    if (e.currentTarget.value.length === 0) {
      setSearchedPosts([])
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (validInput) {
        try {
          const response = await getNewsFeedPost(
            inputValue.includes('#') ? `%23${inputValue.slice(1)}` : inputValue
          )

          if (response.status === 200) {
            setSearchedPosts(response.data)

            if (fetchError) {
              setFetchError(false)
            }
          }
        } catch (error) {
          setFetchError(true)
        }
      }
    }

    fetchPosts()
  }, [fetchError, inputValue, validInput])

  useCommentQuote(searchedPosts, setSearchedPosts)
  useDislikeQuote(searchedPosts, setSearchedPosts)
  useDeleteQuote(searchedPosts, setSearchedPosts)
  useDeleteMovie(searchedPosts, setSearchedPosts)
  useEditQuote(searchedPosts, setSearchedPosts)
  useLikeQuote(searchedPosts, setSearchedPosts)

  return {
    setFetchError,
    changeHandler,
    searchedPosts,
    fetchError,
    inputValue,
    t,
  }
}
