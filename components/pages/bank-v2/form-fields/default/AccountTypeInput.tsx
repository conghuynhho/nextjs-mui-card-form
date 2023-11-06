import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { nsBankTran } from '../../../../../pages/bank'
import { useTranslation } from 'next-i18next'
import { useAppDispatch } from '../../../../../store/hooks'
import { actions } from '../../../../../store/bankSlice'
import { handleRemoveFocusCardStyles, handleSetFocusCardStyles } from '../../const'
import { idRefAccType } from '../../card/CardAccountType'

function AccountTypeInput() {
  const {t} = useTranslation(nsBankTran)
  const { control, formState: {errors} } = useFormContext()
  const dispatch = useAppDispatch()
  const isError = Boolean(errors && !!Object.keys(errors.accountType || {}).length)
  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))

  return (
    <FormControl error={isError}>
      <Controller
        control={control}
        name="accountType"
        aria-describedby="component-error-text"
        rules={{
          required: true,
        }}
        render={({ field }) => {
          return (
            <RadioGroup
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              onFocus={(e) => setTimeout(() => handleSetFocusCardStyles(e as any, setStylesFocus))}
              onBlur={() => {
                handleRemoveFocusCardStyles(setStylesFocus)
                field.onBlur()
              }}
            >
              {/*@ts-ignore*/}
              <FormControlLabel
                value={1}
                control={
                  <Radio
                    // @ts-ignore
                    inputProps={{'data-ref': idRefAccType}}
                  />
                }
                label={`${t('acc-type-1')}`}
              />
              {/*@ts-ignore*/}
              <FormControlLabel
                value={2}
                control={
                  <Radio
                    // @ts-ignore
                    inputProps={{'data-ref': idRefAccType}}
                  />
                }
                label={`${t('acc-type-2')}`}
              />
            </RadioGroup>
          )
        }}
      />
    </FormControl>
  )
}

export default AccountTypeInput
