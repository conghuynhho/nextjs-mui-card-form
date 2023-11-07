import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Slide from '@mui/material/Slide'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import AppBar from '@mui/material/AppBar'
import Link from 'next/link'
const nsTran = 'common@common-layout'

interface HideOnScrollProps {
  window?: () => Window
  children: React.ReactElement
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

interface BackButtonProps {
  onClick?: () => void
  to: string
}
const defaultProps: BackButtonProps = {
  onClick: undefined,
  to: '/',
}

function CustomButton({ onClick }: { onClick?: () => void }) {
  const theme = useTheme()
  const { t } = useTranslation(nsTran)
  return (
    <Button
      css={css`
        display: inline-flex;
        justify-content: start;
        color: ${theme.palette.text.primary};
        padding: 0;
      `}
      onClick={onClick}
    >
      <ChevronLeftIcon />
      <Typography
        variant="body1"
        css={css`
          display: inline-block;
        `}
      >
        {t('onBack')}
      </Typography>
    </Button>
  )
}

export const BackButton = function (props: BackButtonProps) {
  let isShowNextLink = true
  if (typeof props.onClick === 'function') {
    isShowNextLink = false
  }
  return (
    <HideOnScroll {...props}>
      <AppBar
        position="sticky"
        css={css`
          box-shadow: none;
          background-color: #ffffff;
        `}
      >
        <div
          css={css`
            height: 48px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
          `}
        >
          {isShowNextLink ? (
            <Link href={props.to} passHref
              css={css`
                  text-decoration: none;
                `}
            >
              <CustomButton />
            </Link>
          ) : (
            <CustomButton onClick={props.onClick} />
          )}
        </div>
      </AppBar>
    </HideOnScroll>
  )
}
BackButton.defaultProps = defaultProps
export default BackButton
