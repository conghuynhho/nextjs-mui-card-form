import NextErrorComponent, { ErrorProps } from 'next/error'
import { NextPage } from 'next'
import { NextPageContext } from 'next'
import { ggjServerSideTranslations } from 'common/i18nUtils'
import type { NextRequest } from 'next/server'

interface Props {
  userAgent?: string
  statusCode: number
}

const hookRender = (err: NextPageContext['err'], req: NextPageContext['req']) => {
  console.log(err, req)
}

const MyError: NextPage<Props> = (ctx) => {
  const statusCode: number = ctx.statusCode
  return <NextErrorComponent statusCode={statusCode} />
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { err, req } = ctx
  const props = NextErrorComponent.getInitialProps(ctx) as ErrorProps
  const statusCode = props.statusCode
  // if the error is status http 500, send slack
  if (statusCode === 500) {
    hookRender(err, req)
  }

  // other http status code
  return {
    props: {
      ...props,
      ...(await ggjServerSideTranslations(ctx.req as unknown as NextRequest, []))
    }
  }
}

export default MyError
