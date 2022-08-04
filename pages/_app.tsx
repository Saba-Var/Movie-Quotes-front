import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'
import { ComponentWithPageLayout } from 'types'
import 'styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ComponentWithPageLayout) {
  return (
    <SessionProvider session={session}>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
