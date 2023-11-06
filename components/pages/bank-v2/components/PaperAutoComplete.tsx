import { Grow, Paper, PaperProps } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

/* This component make AutoComplete has smoothly open transition */
function PaperComponent(paperProps: PaperProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Grow in>
      <Paper {...paperProps} ref={ref} />
    </Grow>
  )
}
export const PaperComponentForward = forwardRef(PaperComponent)
