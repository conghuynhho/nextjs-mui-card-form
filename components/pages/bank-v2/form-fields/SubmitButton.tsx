import Button from '@mui/material/Button'
import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import { nsBankTran } from '../../../../pages/index'
import { useTranslation } from 'next-i18next'
import { actions, IBankInfo, updateBankInfo } from '../../../../store/bankSlice'
import { loadingOffHandler, loadingOnHandler } from '../../../../contexts/LoadingContext'
import { toastHandler } from '../../../../contexts/ToastContext'
import { useFormContext } from 'react-hook-form'
import { useAppDispatch } from '../../../../store/hooks'
import { useRouter } from 'next/router'
import { ggjDebounce } from '../../../../common/utils'

function SubmitButton() {
  const theme = useTheme()
  const { t } = useTranslation(nsBankTran)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const u = (router.query?.u || '') as string  // u is url to redirect after submit (skijan/mp/display/skill)

  const { handleSubmit } = useFormContext<IBankInfo>()

  const onSubmit = async (data: IBankInfo) => {
    try {
      loadingOnHandler()
      const res = await updateBankInfo([data])
      if (res?.error) {
        toastHandler({
          type: 'error',
        })
        return
      }
      dispatch(actions.setBankInfo([data]))
      toastHandler({ message: t('update-success'), type: 'success' })
      if (u) {
        window.location.href = u
      }
    } catch (error) {
      toastHandler({ type: 'error' })
    } finally {
      loadingOffHandler()
    }
  }

  return (
    <Button
      variant="contained"
      onClick={ggjDebounce(handleSubmit(onSubmit), 400)}
      fullWidth
      css={css`
          margin-top: ${theme.spacing(3)};
          padding: 14px 16px;
          width: 100%;
        `}
    >
      {t('submit')}
    </Button>
  )
}

export default SubmitButton
