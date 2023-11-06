import { FormControl, FormHelperText, OutlinedInput } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { nsBankTran, numbersValidate } from 'pages/index'
import { useTranslation } from 'next-i18next'
import { css } from '@emotion/react'
import { KeyboardEvent } from 'react'
import { idRefCardNumber } from '../card/CardNumber'
import { actions } from '../../../../store/bankSlice'
import { handleRemoveFocusCardStyles, handleSetFocusCardStyles } from '../const'
import { useAppDispatch } from '../../../../store/hooks'

function AccountNumberInput() {
  const { control, formState: {errors}} = useFormContext()
  const {t} = useTranslation(nsBankTran)
  const dispatch = useAppDispatch()
  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    // only allow numbers
    if(!numbersValidate.test(e.key)) {
      e.preventDefault()
    }

  }

  return (
    <FormControl fullWidth error={errors && !!Object.keys(errors.accountNumber || {}).length}>
      <Controller
        control={control}
        name="accountNumber"
        aria-describedby="component-error-text"
        rules={{
          required: true,
          pattern: numbersValidate,
          minLength: 1,
          maxLength: 34,
        }}
        defaultValue=""
        render={({field: {onChange, onBlur, ...rest}}) => {
          return (
            <OutlinedInput
              id="accountNumber"
              type="text"
              fullWidth
              autoComplete="off"
              placeholder="1234567890"
              onKeyPress={handleKeyPress}
              inputProps={{
                'data-ref': idRefCardNumber,
                maxLength: 34,
              }}
              onChange={(e) => {
                onChange(e.target.value.replace(/[^0-9]/g, ''))
                // cheat to make sure to get card styles after dom updated
                setTimeout(() => {
                  handleSetFocusCardStyles(e as any, setStylesFocus)
                })
              }}
              onFocus={(e) => {
                handleSetFocusCardStyles(e, setStylesFocus)
                e.target.setSelectionRange(e.target.value.length, e.target.value.length)
              }}
              onBlur={() => {
                handleRemoveFocusCardStyles(setStylesFocus)
                onBlur()
              }}
              {...rest}
              css={css`
                border-radius: 5px;
                box-shadow: none;
                transition: all 0.3s ease-in-out;
                font-size: 18px;
                //font-family: "Source Sans Pro", sans-serif;
              `}
            />
          )
        }}
      />
      {!!errors && errors.accountNumber && (
        <FormHelperText id="component-error-text">
          {t(`${errors.accountNumber.type}-accountNumber`, {
            ns: 'common@validate',
          })}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default AccountNumberInput
