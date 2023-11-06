import { Autocomplete, createFilterOptions, FormControl, FormHelperText } from '@mui/material'
import { css } from '@emotion/react'
import bankList  from '../../banks-json/bank-list.json'
import { Controller, useFormContext } from 'react-hook-form'
import { fullWidth, nsBankTran } from '../../../../../pages/bank'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { actions, nsBank } from '../../../../../store/bankSlice'
import { BankItem, handleRemoveFocusCardStyles, handleSetFocusCardStyles } from '../../const'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { atom, useSetAtom } from 'jotai'
import TextField from '@mui/material/TextField'
import { PaperComponentForward } from '../../components/PaperAutoComplete'
import { idRefCardBankName } from '../../card/CardTop'

export const bankUserSelectedAtom = atom<BankItem | null>(null)
const filter = createFilterOptions<BankItem>()
const typedBankList = bankList as BankItem[]
const emptyBankItem = {
  id: 0,
  bank_name: '',
  spm_bank_id: 0,
}

function BankNameInput() {
  const {t} = useTranslation(nsBankTran)
  const {control, setValue, formState: {errors}} = useFormContext()
  const currentBankName = useAppSelector((state) => state[nsBank]?.bankInfoArr?.[0]?.bankName) || ''
  const setUserSelectBankName = useSetAtom(bankUserSelectedAtom)
  const dispatch = useAppDispatch()

  const defaultBank = useMemo<BankItem>(() => {
    if(currentBankName) {
      const foundBank = typedBankList.find((itm) => itm.bank_name === currentBankName)
      return foundBank ? foundBank : {
        ...emptyBankItem,
        bank_name: currentBankName,
      }
    }
    return emptyBankItem
  }, [])

  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))
  const isBankNameError = Boolean(errors && !!Object.keys(errors.bankName || {}).length)

  useEffect(() => {
    setUserSelectBankName(defaultBank)
  }, [])

  return (
    <FormControl error={isBankNameError} css={fullWidth}>
      <Controller
        rules={{
          required: true,
        }}
        name="bankName"
        control={control}
        render={({field: { onChange, ...restRHF }}) => {
          return (
            <Autocomplete
              {...restRHF}
              id="bankName"
              css={css`.MuiOutlinedInput-root{ padding: 6px 32px 6px 6px;}`}
              freeSolo forcePopupIcon openOnFocus autoSelect autoComplete
              clearIcon={null}
              PaperComponent={PaperComponentForward}
              ListboxProps={{style: {maxHeight: '300px'}}}
              options={typedBankList}
              defaultValue={defaultBank}
              isOptionEqualToValue={(option, value) => option.bank_name === value}
              onChange={(event, item) => {
                let bankName = ''

                if(typeof item === 'string') {
                  // when press enter
                  bankName = item
                  setUserSelectBankName({...emptyBankItem, bank_name: item})
                }else if(item && item.inputValue) {
                  // when user input and blur or click add
                  bankName = item.inputValue
                  setUserSelectBankName({...emptyBankItem, bank_name: item.inputValue})
                } else {
                  // when user select from list
                  bankName = item?.bank_name || ''
                  setUserSelectBankName(item)
                }
                onChange(bankName)

                const isExistInList = bankList.some((itm) => itm.bank_name === bankName)
                if(restRHF.value !== bankName && isExistInList) {
                  setValue('bankBranchName', '')
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params)

                const { inputValue } = params
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.bank_name)
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    bank_name: inputValue,
                    spm_bank_id: 0,
                    id: 0,
                  })
                }

                return filtered
              }}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue
                }
                // Regular option
                return option.bank_name
              }}
              renderInput={({inputProps, ...rest}) => (
                <div ref={rest.InputProps.ref}>
                  <TextField
                    placeholder={t('bank-name-pl')}
                    type="text"
                    {...rest}
                    inputProps={{
                      ...inputProps,
                      autoComplete: 'off',
                      'data-ref': idRefCardBankName
                    }}
                    onFocus={(e) => {
                      handleSetFocusCardStyles(e, setStylesFocus)
                      e.target.setSelectionRange(e.target.value.length, e.target.value.length)
                    }}
                    onBlur={() => {
                      handleRemoveFocusCardStyles(setStylesFocus)
                    }}
                    error={isBankNameError}
                    css={css`
                      transition: all 0.3s ease-in-out;
                      font-size: 18px;
                      font-family: "Source Sans Pro", sans-serif;
                      border-radius: 5px;
                    `}
                  />
                </div>
              )}
            />
          )
        }}
      />

      {isBankNameError && (
        <FormHelperText id="component-error-text">
          {t(`${errors.bankName.type}-bankName`, {
            ns: 'common@validate',
          })}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default BankNameInput
