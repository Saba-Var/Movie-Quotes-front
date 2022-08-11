import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'
import { ComponentWithPageLayout } from 'types'
import { SocketProvider } from 'context'
import 'styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ComponentWithPageLayout) {
  return (
    <SessionProvider session={session}>
      <SocketProvider>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </SocketProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
