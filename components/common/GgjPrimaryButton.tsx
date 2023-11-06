import { Button, ButtonProps } from '@mui/material'
import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

export function GgjPrimaryButton({children, ...rest}: ButtonProps) {
  const theme = useTheme()
  return (
    <Button
      variant="contained"
      {...rest}
      fullWidth
      css={css`
        text-transform: none;
        height: ${theme.spacing(6)};
        align-items: center;
      `}
    >
      {children}
    </Button>
  )
}

export default GgjPrimaryButton
