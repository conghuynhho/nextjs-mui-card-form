import {Box, FormControl, FormHelperText, OutlinedInput} from '@mui/material'
import {CardFormInputLabel} from '../../AccountForm'
import {Controller, useFormContext} from 'react-hook-form'
import {nsBankTran} from '../../../../../pages/bank'
import {useTranslation} from 'next-i18next'
import AccountTypeInput from './AccountTypeInput'
import {idRefCardBankName} from '../../card/CardTop'
import {handleRemoveFocusCardStyles, handleSetFocusCardStyles} from '../../const'
import {actions} from '../../../../../store/bankSlice'
import {useAppDispatch} from '../../../../../store/hooks'

function Index() {
  const {control, formState: {errors}} = useFormContext()
  const {t} = useTranslation(nsBankTran)
  const dispatch = useAppDispatch()
  const setStylesFocus = (styles: string | null) => dispatch(actions.setFocusCardStyles(styles))

  const isBankBranchError = Boolean(errors && !!Object.keys(errors.bankBranchName || {}).length)
  const isBankNameError = Boolean(errors && !!Object.keys(errors.bankName || {}).length)
  return (
    <>
      {/*bank name*/}
      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="bankName">
          {t('bank-name')}
        </CardFormInputLabel>

        <FormControl error={isBankNameError} fullWidth>
          <Controller
            control={control}
            name="bankName"
            aria-describedby="component-error-text"
            rules={{
              required: true,
            }}
            render={({field}) => {
              return (
                <OutlinedInput
                  id="bankName"
                  placeholder={t('bank-name-pl')}
                  fullWidth
                  type={'text'}
                  {...field}
                  inputProps={{
                    maxLength: 64,
                    'data-ref': idRefCardBankName
                  }}
                  onFocus={(e) => {
                    handleSetFocusCardStyles(e, setStylesFocus)
                    e.target.setSelectionRange(e.target.value.length, e.target.value.length)
                  }}
                  onBlur={() => {
                    handleRemoveFocusCardStyles(setStylesFocus)
                  }}
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
      </Box>

      {/* branch name */}
      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="bankBranchName">
          {t('branch-name')}
        </CardFormInputLabel>


        <FormControl error={isBankBranchError} fullWidth >
          <Controller
            control={control}
            name="bankBranchName"
            aria-describedby="component-error-text"
            rules={{
              required: true,
            }}
            render={({field}) => {
              return (
                <OutlinedInput
                  placeholder={t('bank-branch-pl')}
                  id="branch-name"
                  fullWidth
                  type={'text'}
                  {...field}
                  inputProps={{maxLength: 64}}
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
      </Box>

      {/* account type */}
      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="accountType">
          {t('acc-type')}
        </CardFormInputLabel>
        <AccountTypeInput />
      </Box>
    </>
  )
}

export default Index
