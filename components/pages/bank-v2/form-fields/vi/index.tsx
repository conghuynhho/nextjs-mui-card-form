import {Box} from '@mui/material'
import BankNameInput from './BankNameInput'
import BankBranchesInput from './BankBranchesInput'
import {CardFormInputLabel} from '../../AccountForm'
import {useTranslation} from 'next-i18next'
import {nsBankTran} from '../../../../../pages/bank'

function Index() {
  const { t } = useTranslation(nsBankTran)
  return (
    <>
      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="bankName">
          {t('bank-name')}
        </CardFormInputLabel>
        <BankNameInput />
      </Box>

      <Box className="card-input" mb={'20px'}>
        <CardFormInputLabel htmlFor="bankBranchName">
          {t('branch-name')}
        </CardFormInputLabel>
        <BankBranchesInput />
      </Box>


    </>
  )
}

export default Index
