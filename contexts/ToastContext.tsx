import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import toast, { DefaultToastOptions, resolveValue, Toast, Toaster, useToasterStore } from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@mui/material/styles'
import { css } from '@emotion/react'
import { Box, IconButton, NoSsr, Stack, Theme } from '@mui/material'
import { Close } from '@mui/icons-material'
import {
  CUSTOM_VARIANTS,
  IToast,
  IToastCustom,
  TMainToast,
  TOAST_EVENT_NAME,
  TVariantKey,
} from './toast-context/toastVariable'
import { customToastHandler } from './toast-context/CustomToastVariants'


interface IToastSetting {
  limit: number
}

interface IToastContext {
  toastSetting: IToastSetting,
  updateToastSetting: (setting: IToastSetting) => void
  resetToastSetting: () => void
}

const defaultToastSetting: IToastSetting = {
  limit: 3,
}

const ToastContext = createContext<IToastContext>({
  toastSetting: defaultToastSetting,
  updateToastSetting: (value) => {
    value
  },
  resetToastSetting: () => undefined,
})

export const useToastContext = () => useContext(ToastContext)

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const [toastSetting, setToastSetting] = useState<IToastSetting>(defaultToastSetting)
  const { toasts } = useToasterStore()
  const defaultToastOptions: DefaultToastOptions = useMemo(() => ({
    className: 'toast-instance',
    style: {
      wordBreak: 'break-all',
      minWidth: '288px',
      borderRadius: '4px',
      fontSize: '14px',
      padding: '2px 8px',
      minHeight: '52px',
      fontWeight: 'bold',
      boxShadow: theme.shadows['4'],
      // backgroundColor: 'transparent'
    },
    success: {
      style: {
        backgroundColor: `${theme.palette.success.light}`,
        color: `${theme.palette.success.main}`,
      },
      icon: <></>,
    },
    error: {
      style: {
        backgroundColor: `${theme.palette.error.contrastText}`,
        color: `${theme.palette.error.main}`,
      },
      icon: <></>,
    },
  }), [])

  const updateToastSetting = (setting: IToastSetting) => {
    setToastSetting({
      ...toastSetting,
      ...setting,
    })
  }
  const resetToastSetting = () => {
    setToastSetting(defaultToastSetting)
  }

  const value = {
    toastSetting,
    updateToastSetting,
    resetToastSetting,
  }

  // handle limit toast
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .forEach((t, index) => {
        (index >= toastSetting.limit) && toast.dismiss(t.id)
      })
  }, [toasts, toastSetting.limit])


  return (
    <ToastContext.Provider value={value}>
      <NoSsr>
        <div css={css`
          & .toast-instance {
            width: 100%;
            max-width: 100%;
            @media (min-width: ${theme.breakpoints.values.md}px) {
              width: auto;
              max-width: 450px;
            }
          }
        `}>
          <Toaster
            position='top-center'
            toastOptions={defaultToastOptions}
          />
        </div>
        <ToastAction />
      </NoSsr>
      {children}
    </ToastContext.Provider>
  )
}

const ToastAction = () => {
  const { t } = useTranslation('common@common-error')
  const theme = useTheme()
  const toastHandler = ((e: CustomEvent<TMainToast>) => {
    const data: TMainToast = e.detail
    const { type } = data

    if (type && CUSTOM_VARIANTS[type as TVariantKey]) {
      customToastHandler(data as IToastCustom, theme)
    } else {
      nativeToastHandler(data as IToast, theme, t('ECI500'))
    }

  }) as EventListener

  useEffect(() => {
    document.addEventListener(TOAST_EVENT_NAME, toastHandler)
    return () => {
      document.removeEventListener(TOAST_EVENT_NAME, toastHandler)
    }
  }, [])
  return <></>
}

export const toastHandler = (data: TMainToast) => {
  document.dispatchEvent(new CustomEvent(TOAST_EVENT_NAME, { detail: data }))
}

const nativeToastHandler = (data: IToast, theme: Theme, errorTxt: string) => {
  const message = data.message || errorTxt as string
  const { type, option, closeButton = {} } = data
  const { isShow = true, styles } = closeButton
  const toastHandler = type ? toast[type] : toast


  const generateMessage = (toastData: Toast) => {
    return (
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        css={css` width: 100%;`}>
        <Box css={css` flex: 1 1 100%;`}>
          {resolveValue(message, toastData)}
        </Box>
        {
          isShow &&
          <IconButton
            css={css`
              flex-grow: 0;
              margin-right: -${theme.spacing(2)};
              margin-left: ${theme.spacing(1)};
              ${styles}`}
            onClick={() => toast.dismiss(toastData.id)}
          >
            <Close />
          </IconButton>
        }
      </Stack>
    )
  }

  toastHandler((toast) => generateMessage(toast), {
    duration: type !== 'error' ? 10000 : undefined,
    ...option,
  })
}

export default ToastProvider
