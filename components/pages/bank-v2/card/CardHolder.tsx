import { css } from '@emotion/react'
import { useFormContext, useWatch } from 'react-hook-form'
import { ReactNode, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { CardBreakpoints, slideFadeRight, slideFadeUpCss } from '../const'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import { useTranslation } from 'next-i18next'
import { nsBankTran } from '../../../../pages/index'

function CardHolder() {
  const {control} = useFormContext()
  const {t} = useTranslation(nsBankTran)
  const cardHolderRef = useRef<HTMLDivElement>(null)
  const cardHolderRef2 = useRef<HTMLDivElement>(null)
  const accountHolder = useWatch({
    name: 'accountHolder',
    control
  }) as string

  return (
    <div css={css`
      position: relative;
      ${slideFadeUpCss}
      ${slideFadeRight}
      .slide-fade-up-exit {
        position: absolute;
        top: 0;
      }
    `}>
      <TransitionGroup enter={true} component={null}>
        {
          accountHolder.length > 0 && <CSSTransition
            key={1}
            mountOnEnter
            unmountOnExit
            timeout={350}
            nodeRef={cardHolderRef}
            classNames='slide-fade-up'
          >
            <div ref={cardHolderRef} key={1}>
              <Container>
                <TransitionGroup component={null}>
                  {
                    accountHolder.replace(/\s\s+/g, '').split('').map((n, index) => (
                      <CardHolderCharAnimate
                        char={n}
                        timeout={350}
                        key={index}
                      />
                    ))
                  }
                </TransitionGroup>
              </Container>
            </div>
          </CSSTransition>
        }
        {
          accountHolder.length <= 0 && <CSSTransition
            key={999}
            timeout={350}
            nodeRef={cardHolderRef2}
            classNames="slide-fade-up"
            unmountOnExit
            mountOnEnter
          >
            <div ref={cardHolderRef2} key={9999}>
              <Container>
                <span css={css`
                  opacity: 0.6;
                `}>
                  {t('taro')}
                </span>
              </Container>
            </div>
          </CSSTransition>
        }
      </TransitionGroup>

    </div>

  )
}

const Container = ({children}: { children: ReactNode }) => {
  return (
    <div
      className='card-item__name ggj-wt'
      css={css`
        font-size: 18px;
        line-height: 1;
        max-width: 100%;
        text-transform: uppercase;
        font-weight: bold;
        @media screen and (max-width: ${CardBreakpoints.small}) {
          font-size: 16px;
        }
      `}
    >
      {children}
    </div>
  )
}

type CardHolderCharAnimateProps = {
  char: string
} & CSSTransitionProps

const CardHolderCharAnimate = (props: CardHolderCharAnimateProps) => {
  const {char, ...rest} = props
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...rest} nodeRef={nodeRef} classNames="slide-fade-right" timeout={350}>
      <span
        ref={nodeRef}
        className='card-item__nameItem'
        css={css`
            display: inline-block;
            min-width: 8px;
            position: relative;
          `}
      >
        {char}
      </span>
    </CSSTransition>
  )
}


export default CardHolder
