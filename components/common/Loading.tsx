import { Backdrop, CircularProgress, useTheme } from '@mui/material'
import { css } from '@emotion/react'
import { useLoadingContext } from 'contexts/LoadingContext'

const Loading = () => {
  const { open } = useLoadingContext()
  const theme = useTheme()
  return (
    <Backdrop
      css={css`
        color: #fff;
        z-index: ${theme.zIndex.modal + 1};
      `}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading
