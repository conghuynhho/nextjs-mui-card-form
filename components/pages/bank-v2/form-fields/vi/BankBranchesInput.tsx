import { Autocomplete, createFilterOptions, FormControl, FormHelperText } from '@mui/material'
import { css } from '@emotion/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useAppSelector } from '../../../../../store/hooks'
import { nsBank } from '../../../../../store/bankSlice'
import { fullWidth, nsBankTran } from '../../../../../pages/bank'
import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai'
import { bankUserSelectedAtom } from './BankNameInput'
import { useMemo } from 'react'
import bankBranchesIndexed from '../../banks-json/bank-branches-indexed.json'
import { BankBranchesIndexed, BankBranchItem } from '../../const'
import TextField from '@mui/material/TextField'
import { PaperComponentForward } from '../../components/PaperAutoComplete'

const typedBankBranchesIndexed = bankBranchesIndexed as BankBranchesIndexed
const filter = createFilterOptions<BankBranchItem>()
function BankBranchesInput() {
  // const theme = useTheme()
  const {t} = useTranslation(nsBankTran)
  const {control, formState: {errors}} = useFormContext()
  const currentBankBranch = useAppSelector(state => state[nsBank]?.bankInfoArr?.[0]?.bankBranch) || ''
  const bankUserSelected = useAtomValue(bankUserSelectedAtom)

  // need to know the spm_bank_id base on the bankName
  // case 1: spm_bank_id = 0 (no autocomplete show)
  // case 2: spm_bank_id = <number> (show autocomplete)
  const bankBranchList = useMemo(() => {
    return bankUserSelected?.spm_bank_id ? typedBankBranchesIndexed[bankUserSelected.spm_bank_id] : []
  }, [bankUserSelected])

  const defaultBankBranch = useMemo<BankBranchItem>(() => {
    if(currentBankBranch) {
      const foundBankBranch = bankBranchList.find((itm) => itm.bank_branch_name === currentBankBranch)
      return foundBankBranch ? foundBankBranch : {
        branch_id: 0,
        bank_branch_name: currentBankBranch,
        spm_bank_id: 0,
      }
    }

    return {
      branch_id: 0,
      bank_branch_name: '',
      spm_bank_id: 0,
    }

  }, [])

  const isBankBranchError = Boolean(errors && !!Object.keys(errors.bankBranchName || {}).length)

  return (
    <FormControl error={isBankBranchError} css={fullWidth}>
      <Controller
        control={control}
        name="bankBranchName"
        rules={{
          required: true,
        }}
        render={({field: { onChange, ...restRHF }}) => {
          return (
            <Autocomplete
              {...restRHF}
              id="bankBranchName"
              css={css`.MuiOutlinedInput-root{ padding: 6px 32px 6px 6px;}`}
              freeSolo openOnFocus autoSelect autoComplete
              forcePopupIcon={bankBranchList.length > 0}
              clearIcon={null}
              PaperComponent={PaperComponentForward}
              ListboxProps={{style: {maxHeight: '300px'}}}
              options={bankBranchList}
              defaultValue={defaultBankBranch}
              isOptionEqualToValue={(option, value) => option.bank_branch_name === value}
              onChange={(event, item) => {
                if(typeof item === 'string') {
                  onChange(item)
                }else if(item && item.inputValue) {
                  onChange(item.inputValue)
                } else{
                  onChange(item?.bank_branch_name || '')
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params)

                const { inputValue } = params
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.bank_branch_name)
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    bank_branch_name: inputValue,
                    branch_id: 0,
                    spm_bank_id: 0,
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
                return option.bank_branch_name
              }}
              renderOption={(props, option) => {
                // prevent duplicate key
                return (
                  <li {...props} key={option.branch_id} >
                    {option.bank_branch_name}
                  </li>
                )
              }}
              renderInput={({inputProps, ...rest}) => (
                <div ref={rest.InputProps.ref}>
                  <TextField
                    placeholder={t('bank-branch-pl')}
                    css={css`
                      transition: all 0.3s ease-in-out;
                      font-size: 18px;
                      font-family: "Source Sans Pro", sans-serif;
                      border-radius: 5px;
                    `}
                    inputProps={{
                      ...inputProps,
                      autoComplete: 'off',
                    }}
                    type="text"
                    {...rest}
                    error={isBankBranchError}
                  />
                </div>
              )}
            />
          )
        }}
      />


      {isBankBranchError && (
        <FormHelperText id="component-error-text">
          {t(`${errors.bankBranchName.type}-bankBranchName`, {
            ns: 'common@validate',
          })}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default BankBranchesInput
