import Loading from 'components/common/Loading'
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'

export interface ILoading {
  open: boolean
}

const contextDefaultValues: ILoading = {
  open: false,
}

export const LoadingContext = createContext<ILoading>(contextDefaultValues)

type Props = {
  children: ReactNode
}

const LoadingProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const openHandler = () => setOpen(true)
  const closeHandler = () => setOpen(false)

  useEffect(() => {
    document.addEventListener('loadingOn', openHandler)
    document.addEventListener('loadingOff', closeHandler)
    return () => {
      document.removeEventListener('loadingOn', openHandler)
      document.removeEventListener('loadingOff', closeHandler)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ open }}>
      {children}
      {open && <Loading />}
    </LoadingContext.Provider>
  )
}

export const loadingOnHandler = () => {
  document.dispatchEvent(new CustomEvent('loadingOn'))
}
export const loadingOffHandler = () => {
  document.dispatchEvent(new CustomEvent('loadingOff'))
}

export const useLoadingContext = () => useContext(LoadingContext)

export default LoadingProvider
