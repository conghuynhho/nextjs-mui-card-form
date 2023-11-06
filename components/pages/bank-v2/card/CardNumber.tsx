import { css } from '@emotion/react'
import { useFormContext, useWatch } from 'react-hook-form'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useRef } from 'react'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import { CardBreakpoints, slideFadeUpCss } from '../const'
import { IBankInfo } from '../../../../store/bankSlice'

export const idRefCardNumber = 'idRefCardNumber'
function CardNumber() {
  const {control} = useFormContext<IBankInfo>()
  const cardNumberRef = useRef<HTMLDivElement>(null)
  const cardNumberRef2 = useRef<HTMLDivElement>(null)
  const accountNumber = useWatch({
    name: 'accountNumber',
    control
  })

  return (
    <label
      htmlFor="accountNumber"
      id={idRefCardNumber}
      css={css`
        width: 100%;
        font-weight: bold;
        line-height: 1;
        color: #fff;
        font-size: 27px;
        margin-top: 10px;
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;
        min-height: 40.5px;

        @media screen and (max-width: ${CardBreakpoints.small}) {
          font-size: 21px;
          padding: 10px 10px;
          min-height: 34.5px;
        }

        @media screen and (max-width: ${CardBreakpoints.smallest}) {
          font-size: 19px;
          padding: 10px 10px;
          min-height: 32.5px;
        }
      `}
    >
      <TransitionGroup css={css`
        position: relative;
        ${slideFadeUpCss}
        & > .slide-fade-up-exit {
          position: absolute;
          top: 0;
        }
      `}>
        {accountNumber.length > 0 && (
          <CSSTransition
            key={1}
            mountOnEnter
            unmountOnExit
            timeout={350}
            nodeRef={cardNumberRef}
            classNames='slide-fade-up'
          >
            <div ref={cardNumberRef}><CardNumberMask /></div>
          </CSSTransition>
        )}
        {(accountNumber || '').length === 0 && (
          <CSSTransition
            key={999}
            timeout={350}
            nodeRef={cardNumberRef2}
            classNames="slide-fade-up"
            unmountOnExit
            mountOnEnter
          >
            <div
              ref={cardNumberRef2}
              css={css`
                word-spacing: 8px;
                @media screen and (max-width: ${CardBreakpoints.small}) {
                  word-spacing: -2px;
                }
                @media screen and (max-width: ${CardBreakpoints.smallest}) {
                  word-spacing: -4px;
                }
              `}
            >#### #### #### ####</div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </label>
  )
}

const CardNumberMask = () => {
  const {control} = useFormContext()
  const accountNumber = useWatch({
    name: 'accountNumber',
    control
  }) as string

  let accountNumberArray

  if(accountNumber.length > 16) {
    accountNumberArray = accountNumber.split('')
  } else {
    accountNumberArray = accountNumber.split('').reduce((acc: string[], cur, index) => {
      acc.push(cur)
      if(index === 3 || index === 7 || index === 11) {
        acc.push(' ')
      }
      return acc
    }, [])
  }


  // const getMaskChar = (char: string, index: number) => {
  //   if(index > 4 && index < 15 && char.trim() !== '') {
  //     return '*'
  //   }
  //   return accountNumberArray[index]
  // }

  return (
    <TransitionGroup
      enter={true}
      appear={true}
      css={slideFadeUpCss}
    >
      {
        accountNumberArray.map((char, index) => (
          <AnimateNumber timeout={350} content={char} key={index} />
        ))
      }
    </TransitionGroup>
  )
}

type AnimateNumberProps = {
  content: string
} & CSSTransitionProps

const AnimateNumber = (props: AnimateNumberProps) => {
  const nodeRef = useRef(null)
  const {content, ...rest} = props
  return (
    <CSSTransition {...rest} nodeRef={nodeRef} classNames="slide-fade-up">
      <div
        ref={nodeRef}
        css={css`
          width: ${content.trim() === '' ? '30px' : '16px'};
          display: inline-block;
          @media screen and (max-width: ${CardBreakpoints.small}) {
            width: ${content.trim() === '' ? '16px' : '13px'}};
          }
          @media screen and (max-width: ${CardBreakpoints.smallest}) {
            width: ${content.trim() === '' ? '8px' : '12px'}
          }
        `}
      >
        {content}
      </div>
    </CSSTransition>
  )
}

export default CardNumber
