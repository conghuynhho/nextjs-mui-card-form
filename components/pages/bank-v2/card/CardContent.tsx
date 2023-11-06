import { css } from '@emotion/react'
import { nsBankTran } from '../../../../pages/bank'
import { useTranslation } from 'next-i18next'
import CardHolder from './CardHolder'
import { CardBreakpoints } from '../const'
import CardAccountType, { idRefAccType } from './CardAccountType'
import { useAppSelector } from '../../../../store/hooks'
import { ns } from '../../../../store/appSlice'
import { TermLangEnum } from '../../../../common/constant'

export const idRefAccountHolder = 'idRefAccountHolder'
function CardContent() {
  const { t } = useTranslation(nsBankTran)
  const termLanguage = useAppSelector((state) => state[ns].auth?.termLanguage)

  const isViTermLang = termLanguage === TermLangEnum.VI

  return (
    <div
      className='card-item__content'
      css={css`
        color: #fff;
        display: flex;
        align-items: flex-start;
      `}
    >
      <label
        htmlFor='accountHolder'
        id={idRefAccountHolder}
        className='card-item__info'
        css={css`
          color: #fff;
          flex-grow: 1;
          max-width: calc(100% - ${isViTermLang ? 0 : 85}px);
          padding: 10px 15px;
          font-weight: 500;
          display: block;

          cursor: pointer;

          @media screen and (max-width: ${CardBreakpoints.small}) {
            padding: 10px;
          }
        `}
      >
        <div
          className='card-item__holder'
          css={css`
            opacity: 0.7;
            font-size: 13px;
            margin-bottom: 6px;
            @media screen and (max-width: ${CardBreakpoints.small}) {
              font-size: 12px;
              margin-bottom: 5px;
            }
          `}
        >
          {t('acc-name')}
        </div>
        <CardHolder />
      </label>

      {
        !isViTermLang && (
          <div
            id={idRefAccType}
            className="card-item__accType"
            css={css`
              margin-left: auto;
              padding: 10px;
              display: inline-flex;
              height: 100%;
              align-items: flex-end;
              justify-content: flex-end;
            `}
          >
            <CardAccountType />
          </div>
        )
      }
    </div>
  )
}

export default CardContent
