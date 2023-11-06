import { css } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import { nsBankTran } from '../../../../pages/bank'
import { useAppSelector } from '../../../../store/hooks'
import { nsBank } from '../../../../store/bankSlice'

function BankHeadings() {
  const {t} = useTranslation(nsBankTran)
  const data = useAppSelector((state) => state[nsBank]?.bankInfoArr?.[0]) || {}
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography variant="h6">{t('registration-title')}</Typography>
      </div>
      <Typography
        variant="subtitle1"
        css={css`
          margin-top: 16px;
        `}
      >
        {t('registration-subtitle')}
      </Typography>

      {data.accountNumber && (
        <Stack
          alignItems="flex-start"
          flexDirection="row"
          mt={2}
        >
          <CheckCircle/>
          <Typography
            variant="caption"
            title={data.bankType == 1 ? t('set') : t('dot-title')}
            className="ggj-wt"
            css={css`
            min-height: 22px;
            margin-left: 10px;
            line-height: 22px;
          `}
          >
            {data.bankType == 1 ? t('set') : t('dot-title')}
          </Typography>
        </Stack>
      )}

    </div>
  )
}

export default BankHeadings
