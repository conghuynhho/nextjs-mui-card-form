import { css } from '@emotion/react'
import { Typography } from '@mui/material'
import { CardBreakpoints, slideFadeUpCss } from '../const'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useFormContext, useWatch } from 'react-hook-form'
import { IBankInfo } from '../../../../store/bankSlice'
import { useMemo, useRef } from 'react'
import { nsBankTran } from 'pages/index'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import chip from '../images/chip.png'

function CardTop() {
  return (
    <div
      className='card-item__top'
      css={css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 10px;
      `}
    >
      <div
        css={css`
          flex-shrink: 0;
          width: 60px;
          @media screen and (max-width: ${CardBreakpoints.small}) {
            width: 50px;
          }
          @media screen and (max-width: ${CardBreakpoints.smallest}) {
            width: 40px;
          }
        `}
      >
        <Image
          src={chip}
          alt="card-chip"
          className='card-item__chip'
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <CardBankNameBox />
    </div>

  )
}

export const idRefCardBankName = 'idRefCardBankName'
const CardBankNameBox = () => {
  const {t} = useTranslation(nsBankTran)
  return (
    <label
      htmlFor='bankName'
      id={idRefCardBankName}
      className='card-item__info'
      css={css`
        height: 48px;
        flex-grow: 1;
        min-width: 0;
        margin-left: 10px;
        line-height: 16px;

        @media screen and (max-width: ${CardBreakpoints.small}) {
          height: 42px;
          line-height: 13px;
        }
        @media screen and (max-width: ${CardBreakpoints.smallest}) {
          height: 32px;
          line-height: 8px;
          p {font-size: 14px;}
        }

        color: #fff;
        text-align: right;
        padding: 5px 10px;
        font-weight: 500;
        display: block;
        cursor: pointer;
      `}
    >
      <div
        className='card-item__holder'
        css={css`
            opacity: 0.7;
            font-size: 13px;
            @media screen and (max-width: ${CardBreakpoints.small}) {
              font-size: 12px;
            }
          `}
      >
        {t('bank')}
      </div>

      <CardBankName />
    </label>
  )
}


const CardBankName = () => {
  const {control} = useFormContext<IBankInfo>()
  const {t} = useTranslation(nsBankTran)
  const bankName = useWatch<IBankInfo>({
    name: 'bankName',
    control
  }) as string
  const cardBankNameRef = useRef<HTMLDivElement>(null)
  const cardBankNameRef2 = useRef<HTMLDivElement>(null)

  const bankNameAbbr = useMemo(() => {
    if (!bankName) return ''
    return bankName.split('-')[0]
  }, [bankName])

  return (
    <div
      css={css`
          position: relative;
          ${slideFadeUpCss}
          .slide-fade-up-exit {
            position: absolute;
            width: 100%;
            top: 0;
            right: 0;
          }
        `}
    >
      <TransitionGroup enter={true} component={null}>
        {
          !!bankName && (
            <CSSTransition
              key={1}
              mountOnEnter
              unmountOnExit
              timeout={350}
              nodeRef={cardBankNameRef}
              classNames='slide-fade-up'
            >
              <Typography
                ref={cardBankNameRef}
                variant="body1"
                className="ggj-wt"
                color="white"
                css={css`
                  font-family: "Source Code Pro", 'YakuHanJP', sans-serif;
                  white-space: nowrap;
                  display: block;
                `}
              >
                {bankNameAbbr || bankName}
              </Typography>
            </CSSTransition>
          )
        }
        {
          !bankName && (
            <CSSTransition
              key={2}
              mountOnEnter
              unmountOnExit
              timeout={350}
              nodeRef={cardBankNameRef2}
              classNames='slide-fade-up'
            >
              <Typography css={css`font-family: "Source Code Pro", 'YakuHanJP', sans-serif;`} ref={cardBankNameRef2} variant='body1' color='white'>
                {t('bank-name-pl')}
              </Typography>
            </CSSTransition>
          )
        }

      </TransitionGroup>

    </div>
  )
}


export default CardTop
