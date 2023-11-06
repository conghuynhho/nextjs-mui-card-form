import { css, Global } from '@emotion/react'
import AccountForm from './AccountForm'
import BankProvider from './BankProvider'
import BankHeadings from './components/BankHeadings'
import Card from './card'
import { useTheme } from '@mui/material'

function BankV2() {
  const theme = useTheme()

  return (
    <>
      <Global styles={css`
        html {
          scroll-behavior: smooth;
        }

        @font-face {
          font-family: 'Source Code Pro';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('/static/fonts/SourceCodePro-Regular.ttf') format('truetype');
        }
      `} />
      <BankProvider>
        <BankHeadings />
        <div
          className='wrapper'
          css={css`
            display: flex;
            padding: 40px 0;

            @media (min-width: ${theme.breakpoints.values.md}px) {
              padding: 50px 15px;
            }


          `}
        >
          <div
            className='card-form'
            css={css`
              max-width: 570px;
              margin: auto;
              width: 100%;
            `}
          >
            <Card />
            <AccountForm />
          </div>
        </div>
      </BankProvider>
    </>
  )
}

export default BankV2
