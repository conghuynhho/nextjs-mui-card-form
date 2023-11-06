import { css } from '@emotion/react'
import { FocusEvent } from 'react'

export interface BankItem {
  id: number
  bank_name: string
  spm_bank_id: number
  inputValue?: string
}
export interface BankBranchItem {
  branch_id: number,
  spm_bank_id: number,
  bank_branch_name: string,
  inputValue?: string
}
export interface BankBranchesIndexed {
  [key: string]: BankBranchItem[]
}

export const CardBreakpoints = {
  smallest: '360px',
  small: '480px',
}

export const fadeCss = css`
  .fade-enter {
    opacity: 0;
    pointer-events: none;
  }
  .fade-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    opacity: 1;
  }
  .fade-exit {
    transition: all 0.25s ease-in-out;
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    pointer-events: none;
    transition-delay: 0.1s;
  }

`

export const slideFadeUpCss = css`
  .slide-fade-up-enter {
    opacity: 0;
    transform: translateY(15px);
    pointer-events: none;
  }
  .slide-fade-up-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
    transform: translateY(0);
    opacity: 1;
  }
  .slide-fade-up-exit {
    transition: all 0.25s ease-in-out;
    transform: translateY(0);
    opacity: 1;
  }
  .slide-fade-up-exit-active {
    opacity: 0;
    transition-delay: 0.1s;
    transform: translateY(-15px);
    pointer-events: none;
  }
`

export const slideFadeRight = css`
  .slide-fade-right-enter {
    opacity: 0;
    transform: translateX(-10px) rotate(45deg);
    pointer-events: none;
  }
  .slide-fade-right-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
  .slide-fade-right-exit {
    transition: all 0.25s ease-in-out;
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
  .slide-fade-right-exit-active {
    opacity: 0;
    transition-delay: 0.1s;
    transform: translateX(10px) rotate(45deg);
    pointer-events: none;
  }
`

let isFocus = false
export const handleSetFocusCardStyles = (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  setStyles: (styles: string) => void
) => {
  const targetRefId = e.target.dataset.ref
  const target = document.getElementById(targetRefId || '')
  if(!targetRefId || !target) return
  isFocus = true
  const styles = `
    width: ${target.offsetWidth}px;
    height: ${target.offsetHeight}px;
    transform: translate(${target.offsetLeft}px, ${target.offsetTop}px);
  `
  setStyles(styles)
}

export const handleRemoveFocusCardStyles = (
  setStyles: (styles: string | null) => void
) => {
  setTimeout(() => {
    if(!isFocus) {
      setStyles(null)
    }
  }, 300)
  isFocus = false
}
