import {CUSTOM_VARIANTS, IToastCustom} from './toastVariable'
import {Box, IconButton, Stack, Theme} from '@mui/material'
import toast, {Toast} from 'react-hot-toast'
import {css} from '@emotion/react'
import {Close} from '@mui/icons-material'
import {ReactNode} from 'react'
import Link from 'next/link'

export const customToastHandler = (data: IToastCustom, theme: Theme) => {
  const {type, option, message} = data

  const generateMessage = (toastInstance: Toast) => {
    switch (CUSTOM_VARIANTS[type]) {
    case CUSTOM_VARIANTS.noti:
      return <NotiToast data={data} toastInstance={toastInstance} theme={theme}/>
    case CUSTOM_VARIANTS.info:
      return <InfoToast data={data} toastInstance={toastInstance} theme={theme}/>


    default: return <div>{message}</div>
    }
  }

  toast((toast) => generateMessage(toast), {...option})

}

const NotiToast = (props: {
  data: IToastCustom, toastInstance: Toast, theme: Theme
}) => {
  const {data: {message, closeButton = {}}, toastInstance, theme} = props
  const {isShow = true, styles} = closeButton
  const {onClick, isCloseToastAfterClick, url, contentStyles, content} = message

  const handleClick = () => {
    onClick && onClick()
    isCloseToastAfterClick && toast.dismiss(toastInstance.id)
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      css={css` width: 100%;`}>
      <Box css={css` flex: 1 1 100%; ${contentStyles}`}>
        <ConditionalNextLink link={url} onClick={handleClick}>
          {content}
        </ConditionalNextLink>
      </Box>
      {
        isShow &&
        <IconButton
          css={css`
                flex-grow: 0;
                margin-right: -${theme.spacing(2)};
                margin-left: ${theme.spacing(1)};
                ${styles}`}
          onClick={() => toast.dismiss(toastInstance.id)}
        >
          <Close/>
        </IconButton>
      }
    </Stack>
  )
}

const InfoToast = (props: {
  data: IToastCustom, toastInstance: Toast, theme: Theme
}) => {
  const {data: {message, closeButton = {}}, toastInstance, theme} = props
  const {isShow = true, styles} = closeButton
  const {onClick, isCloseToastAfterClick, url, contentStyles, content} = message

  const handleClick = () => {
    onClick && onClick()
    isCloseToastAfterClick && toast.dismiss(toastInstance.id)
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      css={css` width: 100%;`}>
      <Box css={css` flex: 1 1 100%; ${contentStyles}`}>
        <ConditionalNextLink link={url} onClick={handleClick}>
          {content}
        </ConditionalNextLink>
      </Box>
      {
        isShow &&
        <IconButton
          css={css`
                flex-grow: 0;
                margin-right: -${theme.spacing(2)};
                margin-left: ${theme.spacing(1)};
                ${styles}`}
          onClick={() => toast.dismiss(toastInstance.id)}
        >
          <Close/>
        </IconButton>
      }
    </Stack>
  )
}

const ConditionalNextLink = (props: {
  children: ReactNode,
  link?: string,
  onClick?: () => void}
) => {
  const {children, link, onClick} = props

  if(link) return (
    <Link href={link} passHref>
      <a
        onClick={onClick}
        css={css`
          text-decoration: none;
          color: unset;
          display: inline-block;
          width: 100%;
        `}>
        {children}
      </a>
    </Link>
  )

  return (
    <div onClick={onClick}>
      {children}
    </div>
  )
}
