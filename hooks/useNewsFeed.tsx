import axios, { getNewsFeedPost, getUserDetails } from 'services'
import { useCallback, useEffect, useState } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Quotes, UserData } from 'types'
import { useRouter } from 'next/router'
import { getToken } from 'helpers'
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
  const [userDataFail, setUserDataFail] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
  })

  const { data: session, status } = useSession()
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

  useEffect(() => {
    if (!localStorage.getItem('token') && !session && status !== 'loading') {
      router.push(`/${router.locale}/unauthorized`)
    } else {
      if (session && !getCookie('token')) {
        setCookie('token', session.accessToken)
      }

      const fetchUserData = async () => {
        try {
          const token = getToken(session)

          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const { data } = await getUserDetails(token)
            setUserData(data)
          }
        } catch (error: any) {
          setUserDataFail(true)
        }
      }

      fetchUserData()
    }
  }, [router, router.locale, session, status])

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

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
    setUserDataFail,
    setShowSideMenu,
    setInputValue,
    searchedPosts,
    showSideMenu,
    userDataFail,
    inputValue,
    fetchError,
    userData,
    imageSrc,
    navigate,
    t,
  }
}
