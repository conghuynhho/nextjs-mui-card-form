import { FormProvider, useForm } from 'react-hook-form'
import { useAppSelector } from '../../../store/hooks'
import { IBankInfo, nsBank } from '../../../store/bankSlice'
import { ReactNode } from 'react'

function BankProvider({children} : {
  children: ReactNode
}) {
  const data = useAppSelector((state) => state[nsBank]?.bankInfoArr)
  const methods = useForm<IBankInfo>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      accountType: data[0].accountType,
      bankType: data[0].bankType,
      accountNumber: data[0].accountNumber,
      accountHolder: data[0].accountHolder,
      bankName: data[0].bankName,
      bankBranchName: data[0].bankBranchName,
    },
  })
  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

export default BankProvider
