import { UserConfig, appWithTranslation } from 'next-i18next'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import 'yakuhanjp'
import nextI18nConfig from '../next-i18next.config'
// import {i18n} from 'next-i18next'


import { CssBaseline } from '@mui/material'
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles'

import 'common/app.css'
import 'common/nprogress.css'
import { auPayload } from 'common/variables'
import CommonLayout, { WithoutSideMenu } from 'components/layouts/common'
import I18nProvider from 'contexts/I18nContext'
import LoadingProvider from 'contexts/LoadingContext'
import ToastProvider from 'contexts/ToastContext'
import http from 'http'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { AppStore, reducerManager, sw } from 'store'
import { IAuth, actions } from 'store/appSlice'
import themeConfig from 'theme.config'
import { TTimeOut } from '../common/constant'
import { timeZone } from '../common/date'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  },
  locale: string
}

function CommonHead() {
  return (
    <Head>
      <title>NextJS 13.2</title>
      <link data-n-head='true' rel='icon' type='image/x-icon' href='/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0' />
      <meta charSet='utf-8' />
    </Head>
  )
}

const theme = createTheme(themeConfig.light as ThemeOptions)

// timer 10s to call api update last access at. clear timer if leave page
let timerUpdateLastAccessAt : TTimeOut

function GgjApp({
  Component, pageProps
  , locale
}: ComponentWithPageLayout) {
  const PageLayout = Component.PageLayout || WithoutSideMenu
  const router = useRouter()

  useEffect(() => {

    const handleStart = () => {
      clearTimerUpdateLastAccessAt()
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    const clearTimerUpdateLastAccessAt = () => {
      if(timerUpdateLastAccessAt) {
        clearTimeout(timerUpdateLastAccessAt)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  // i18n?.changeLanguage(locale)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CommonHead />
      {/*TODO: Thao, remove hard code language*/}
      <I18nProvider locale={locale}>
        <CommonLayout>
          <PageLayout>
            <LoadingProvider>
              <ToastProvider>
                <Component {...pageProps} />
              </ToastProvider>
            </LoadingProvider>
          </PageLayout>
        </CommonLayout>
      </I18nProvider>
    </ThemeProvider>
  )
}

interface IncomingMessage extends http.IncomingMessage {
  get cookies(): {
    [key: string]: string;
  }
}

function appendAuth(req: IncomingMessage, store: AppStore) {
  if (typeof window !== 'undefined' /*is client*/) {
    return
  }
  let pl: IAuth | Record<string, never> = {}
  try {
    pl = JSON.parse(req.headers[auPayload] as string || '')
  } catch (e) {
    // do nothing
  } finally {
    pl && store.dispatch(actions.setAuth(pl))
  }
}

GgjApp.getInitialProps = sw.getInitialAppProps(store => async (appContext: AppContext) => {
  const req = appContext?.ctx?.req as IncomingMessage
  let locale = 'en'
  if(req && req.cookies) locale = (req as unknown as {cookies: {lang: string}}).cookies?.lang
  if (!timeZone[locale]) {
    locale = 'en'
  }
  reducerManager.restoreReducer()
  appendAuth(req, store)
  return {
    ...(await App.getInitialProps(appContext)), locale
  }
})

export default sw.withRedux(appWithTranslation(GgjApp, nextI18nConfig as unknown as UserConfig))
