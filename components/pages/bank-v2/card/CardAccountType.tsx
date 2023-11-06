import { Controller } from 'react-hook-form'
import { nsBankTran } from 'pages/index'
import { useTranslation } from 'next-i18next'
import { css } from '@emotion/react'
import { handleRemoveFocusCardStyles, handleSetFocusCardStyles } from '../const'
import { FormControl, MenuItem, Select } from '@mui/material'
import { actions } from '../../../../store/bankSlice'
import { useAppDispatch } from '../../../../store/hooks'

export const idRefAccType = 'idRefAccType'
function CardAccountType() {
  const {t} = useTranslation(nsBankTran)
  const dispatch = useAppDispatch()
  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))

  return (
    <FormControl>
      <Controller
        name="accountType"
        render={({field}) => {
          return (
            <Select
              {...field}
              SelectDisplayProps={{
                // @ts-ignore
                'data-ref': idRefAccType,
              }}
              inputProps={{
                'data-ref': idRefAccType,
              }}
              onFocus={(e) => handleSetFocusCardStyles(e, setStylesFocus)}
              onBlur={() => {
                handleRemoveFocusCardStyles(setStylesFocus)
                field.onBlur()
              }}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              css={css`
                font-family: "Source Code Pro", 'YakuHanJP', sans-serif;
                letter-spacing: -0.5px;
                color: #fff;
                .MuiSelect-select {
                  padding: 0 28px 0 5px;
                }
                svg {
                  color: #fff;
                  right: 2px;
                }
                fieldset {
                  outline: 0;
                  border: 0;
                }
              `}
            >
              <MenuItem value={0} disabled>{t('acc-type')}</MenuItem>
              <MenuItem value={1}>{t('acc-text-1')}</MenuItem>
              <MenuItem value={2}>{t('acc-text-2')}</MenuItem>
            </Select>
          )
        }}
      />

    </FormControl>

  )
}

export default CardAccountType
