import {useAppSelector} from '../../../../store/hooks'
import {ns} from '../../../../store/appSlice'
import {TermLangEnum} from '../../../../common/constant'
import ViBankFormFields from './vi'
import DefaultBankFormFields from './default'

function FieldsWrapper() {
  const termLanguage = useAppSelector((state) => state[ns].auth?.termLanguage)

  if(termLanguage === TermLangEnum.VI) {
    return <ViBankFormFields />
  }

  return <DefaultBankFormFields />
}

export default FieldsWrapper
