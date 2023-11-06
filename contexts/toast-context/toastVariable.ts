import {Renderable, Toast, ToastOptions, ToastType, ValueOrFunction} from 'react-hot-toast'
import {SerializedStyles} from '@emotion/react'

export const TOAST_EVENT_NAME = 'toastOn'

export const CUSTOM_VARIANTS = {
  noti: 'notification',
  info: 'information'
}

export type TVariantKey = keyof typeof CUSTOM_VARIANTS
export type TVariantValue = typeof CUSTOM_VARIANTS[TVariantKey]


export interface IToast {
  message?: ValueOrFunction<Renderable, Toast>
  type?: Exclude<ToastType, 'blank'>
  option?: ToastOptions
  closeButton?: {
    isShow?: boolean
    styles?: SerializedStyles
  }
}

export interface IToastCustom {
  message: {
    content: string,
    url?: string,
    onClick?: () => void,
    isCloseToastAfterClick?: boolean
    contentStyles?: SerializedStyles
  },
  type: TVariantKey
  option?: ToastOptions
  closeButton?: {
    isShow?: boolean
    styles?: SerializedStyles
  }
}
export type TMainToast = IToast | IToastCustom
