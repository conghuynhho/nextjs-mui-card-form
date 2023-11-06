import NextErrorComponent from 'next/error'
import {i18n} from 'next-i18next'
import { BackButton } from 'components/common'
import {Button} from '@mui/material'
import { css } from '@emotion/react'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'

const ns = 'common@common-layout'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const json = require(`lang/en/${ns}.json`)

export default function MyError() {
  // TODO: An -
  // Fix warning: Cannot update a component (`Header`) while rendering a different component (`GgjApp`).
  // To locate the bad setState() call inside `GgjApp`,
  i18n?.addResourceBundle('en', ns, json)
  return (
    <>
      <BackButton to="/"/>
      <div css={css`
        position: relative;
        height: calc(100vh - 184px);
        padding-bottom: 110px;
        > div {
          max-height: 100%;
          h1 {
            line-height: 1.3;
          }
        }
      `}>
        <NextErrorComponent statusCode={404} css={css`padding-bottom: 110px;`}/>

        <Link href="/">
          <Button
            css={css`
            position: absolute;
            top: 50%;
            transform: translate(-50%, 50%);
            left: 50%;
          `}
            variant="contained"
            startIcon={<HomeIcon/>}
          >Go Home</Button>
        </Link>
      </div>
    </>
  )
}
