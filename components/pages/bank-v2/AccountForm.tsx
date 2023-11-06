import {css} from '@emotion/react'
import {Box} from '@mui/material'
import {useTranslation} from 'next-i18next'
import {nsBankTran} from '../../../pages/bank'
import AccountNumberInput from './form-fields/AccountNumberInput'
import AccountHolderInput from './form-fields/AccountHolderInput'
import SubmitButton from './form-fields/SubmitButton'
import {CardBreakpoints} from './const'
import {ReactNode} from 'react'
import FieldsWrapper from './form-fields/FieldsWrapper'


export const CardFormInputLabel = (props: {
  htmlFor: string,
  children: ReactNode
}) => {
  const { htmlFor, children } = props
  return (
    <label
      htmlFor={htmlFor}
      className="card-input__label"
      css={css`
        font-size: 14px;
        margin-bottom: 5px;
        font-weight: bold;
        color: #626262;
        width: 100%;
        display: block;
        user-select: none;
      `}
    >{children}</label>
  )
}

function AccountForm() {
  const { t } = useTranslation(nsBankTran)
  return (
    <div
      className="card-form__inner"
      css={css`
        background: #fff;
        //box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -50px -2px 16px 0px;
        //box-shadow: 3px 13px 30px 0px rgba(21, 34, 67, 0.2);
        //box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
        //box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
        box-shadow: rgba(136, 165, 191, 0.78) 0px 2px 12px 0px, rgba(255, 255, 255, 0.8) -50px 2px 16px 0px;
        border-radius: 10px;
        padding: 180px 35px 35px;

        @media screen and (max-width: ${CardBreakpoints.small}) {
          padding: 165px 25px 25px;
        }
        @media screen and (max-width: ${CardBreakpoints.smallest}) {
          padding: 165px 15px 15px;
        }
      `}
    >

      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="accountNumber">
          {t('acc-num')}
        </CardFormInputLabel>
        <AccountNumberInput />
      </Box>


      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="accountHolder">
          {t('acc-name')}
        </CardFormInputLabel>
        <AccountHolderInput />
      </Box>

      <FieldsWrapper />

      <SubmitButton />
    </div>
  )
}

export default AccountForm
