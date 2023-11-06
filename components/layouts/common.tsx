// mui
import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// react, emotion react
import { css } from '@emotion/react'
import { ReactNode, useMemo } from 'react'

// logo components

// next
import '@ggj/change-language/dist/lib-change-language.css'
import { useI18nContext } from 'contexts/I18nContext'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

// const
const nsTran = ['common@common-layout']
const bodyMaxWidth = '1128px'

const { publicRuntimeConfig } = getConfig()

/**
 * [Functional components]
 * Common layout for myaccount service.
 * */
export default function CommonLayout(props: { children: ReactNode }) {
  return <div css={css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `}>
    <Header />
    <main css={css` flex-grow: 1;`}>
      {props.children}
    </main>
  </div>
}

/**
 * [Functional components]
 * Common layout for myaccount service.
 * */
export function WithoutSideMenu(props: { children: ReactNode }) {
  const theme = useTheme()
  return <div css={css`
      padding: 0 16px;
      min-height: calc(100vh - 336px);
      @media only screen and (min-width: ${theme.breakpoints.values.md}px) {
        padding: 0 24px ${theme.spacing(7)};
        margin: 0 24px;
      }
      @media only screen and (min-width: ${theme.breakpoints.values.lg}px) {
        padding: 0 ${theme.spacing(6)} ${theme.spacing(7)};
        width: 100%;
        max-width: ${bodyMaxWidth};
        margin: 0 auto;
      }`
  }>
    {props.children}
  </div>
}

export function useGetSkijanHost() {
  const { locale } = useI18nContext()
  return useMemo(() => {
    return `${publicRuntimeConfig.SKJ_HOST_URL}/${['vi', 'ja'].includes(locale) ? locale : 'ja'}`
  }, [])
}

export function useGetGogoHost() {
  const { locale } = useI18nContext()
  return useMemo(() => {
    return `${publicRuntimeConfig.GOGO_URL}/${
      locale !== 'ja'
        ? (['vi', 'en', 'th'].includes(locale) ? locale : '')
        : ''
    }`
  }, [])
}

export function useGetRealTradeHost() {
  const { locale } = useI18nContext()
  return useMemo(() => {
    return `${publicRuntimeConfig.REALTRADE_URL}/${
      locale !== 'ja'
        ? (['en', 'th'].includes(locale) ? locale : '')
        : ''
    }`
  }, [])
}

/**
 * [Functional components]
 * Header of the "CommonLayout".
 * */
function Header() {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation(nsTran)

  let hiddenHeader = ''
  if (router.pathname !== '/') {
    hiddenHeader = `@media only screen and (max-width: ${theme.breakpoints.values.md}px) { display: none;}`
  }
  return <AppBar
    color="transparent"
    position='relative' // Don't allow mui to add 'mui-fixed' class, which cause shifting when opening modals
    css={css`
      background: #fff;
      position: sticky;
      box-shadow: none;
      margin-bottom: 2px;
      height:72px;
      border-bottom: 1px solid ${theme.palette.divider};
      ${hiddenHeader};
      @media (min-width: ${theme.breakpoints.values.md}px) {
        position: static;
      }
    `}
  >
    <Toolbar
      variant="dense"
      css={css`
        justify-content: space-between;
        max-width: ${bodyMaxWidth};
        padding: 0 16px;
        height:100%;
        @media only screen and (min-width: ${theme.breakpoints.values.md}px) {
          padding: 0 24px;
          margin: 0 24px;
        }
        @media only screen and (min-width: ${theme.breakpoints.values.lg}px) {
          padding: 0 ${theme.spacing(6)};
          width: 100%;
          max-width: ${bodyMaxWidth};
          margin: 0 auto;
        }
      `}
    >
      <div css={css`display: flex; align-items:center`}>
        <Typography variant="h6" css={css`margin-left: ${theme.spacing(3)}; color:${theme.palette.text.primary}`}>{t('titleHeader')}</Typography>
      </div>
    </Toolbar>
  </AppBar>
}
