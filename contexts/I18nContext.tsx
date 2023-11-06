import { createContext, ReactNode, useContext } from 'react'

export interface II18n {
  locale: string
}

const contextDefaultValues: II18n = {
  locale: 'en',
}

export const I18nContext = createContext<II18n>(contextDefaultValues)

const I18nProvider = ({children, locale}: {children: ReactNode, locale: string}) => {
  return (
    <I18nContext.Provider value={{locale: locale}}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18nContext = () => useContext(I18nContext)

export default I18nProvider
