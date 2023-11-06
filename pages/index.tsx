import { css } from '@emotion/react'
import { ggjServerSideTranslations } from 'common/i18nUtils'
import { BackButton } from 'components/common'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { NextRequest } from 'next/server'
import { useEffect } from 'react'
import { reducerManager, sw } from 'store'
import slice, { nsBank } from 'store/bankSlice'
import BankV2 from '../components/pages/bank-v2'

export const nsBankTran = ['components@bank', 'common@validate']


export const botTypo = css`
  margin-bottom: 8px;
`

export const fullWidth = css`
  width: 100%;
`
export const splitAcc = (str: string) => {
  const chunks = []

  for (let i = 0, charsLength = str.length; i < charsLength; i += 4) {
    chunks.push(str.substring(i, i + 4))
  }
  return chunks
}

export const numbersValidate = new RegExp('^[0-9]+$')

const Bank = () => {
  reducerManager.add(slice)
  const { t } = useTranslation(nsBankTran)
  useEffect(() => {
    return () => {
      reducerManager.remove(nsBank)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t('meta-title')}</title>
        <meta name="description" content={t('meta-description')} />
        <meta name="keywords" content={t('meta-kw')} />
      </Head>
      <BackButton />

      <BankV2 />
    </>
  )
}

export const getServerSideProps = sw.getServerSideProps(() => async ({ req }) => {
  reducerManager.add(slice)


  const [_nextI18Next] = await Promise.all([
    ggjServerSideTranslations(req as unknown as NextRequest, nsBankTran),
  ])

  const props = {
    props: {
      ..._nextI18Next,
    },
  }
  return { ...props }
})

export default Bank
