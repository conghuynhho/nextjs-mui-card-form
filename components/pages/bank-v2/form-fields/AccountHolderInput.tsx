import { FormControl, FormHelperText, OutlinedInput } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { nsBankTran } from 'pages/index'
import { useTranslation } from 'next-i18next'
import { css } from '@emotion/react'
import { KeyboardEvent } from 'react'
import { idRefAccountHolder } from '../card/CardContent'
import { handleRemoveFocusCardStyles, handleSetFocusCardStyles } from '../const'
import { actions } from '../../../../store/bankSlice'
import { useAppDispatch } from '../../../../store/hooks'
function AccountHolderInput() {
  const { control, formState: {errors}} = useFormContext()
  const {t} = useTranslation(nsBankTran)
  const dispatch = useAppDispatch()

  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))

  return (
    <FormControl fullWidth error={errors && !!Object.keys(errors.accountHolder || {}).length}>
      <Controller
        control={control}
        name="accountHolder"
        aria-describedby="component-error-text"
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, ...rest}}) => {
          return (
            <OutlinedInput
              id="accountHolder"
              type="text"
              fullWidth
              autoComplete="off"
              placeholder={t('taro')}
              inputProps={{
                'data-ref': idRefAccountHolder,
                maxLength: 128,
              }}
              {...rest}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                // only allow alphabets
                // not allow two spaces in a row
                const isDoubleSpace = (e.target as HTMLInputElement).value.endsWith(' ') && e.key === ' '
                const isStartWithSpace = (e.target as HTMLInputElement).value.length === 0 && e.key === ' '
                if (isDoubleSpace || isStartWithSpace) {
                  e.preventDefault()
                }
                // if (e.key.match(/[^a-zA-Z\s]/g)) {
                //   e.preventDefault()
                // }
              }}
              onChange={(e) => {
                onChange(
                  e.target.value
                    // .replace(/[^a-zA-Z\s]/g, '')
                    .replace(/\s+/g, ' ')
                    .toUpperCase())
              }}
              onFocus={(e) => {
                handleSetFocusCardStyles(e, setStylesFocus)
                e.target.setSelectionRange(e.target.value.length, e.target.value.length)
              }}
              onBlur={() => {
                handleRemoveFocusCardStyles(setStylesFocus)
                onBlur()
              }}

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
      {!!errors && errors.accountHolder && (
        <FormHelperText id="component-error-text">
          {t(`${errors.accountHolder.type}-accountHolder`, {
            ns: 'common@validate',
          })}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default AccountHolderInput
