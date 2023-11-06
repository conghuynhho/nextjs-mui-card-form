import { format, utcToZonedTime } from 'date-fns-tz'
import { useI18nContext } from '../contexts/I18nContext'

export const dateFormat = 'yyyy年MM月dd日'

export const timeZone: {[index: string]: string} = {
  ja: 'Asia/Tokyo',
  en: 'America/New_York',
  th: 'Asia/Bangkok',
  ch: 'Asia/Shanghai',
  tw: 'Asia/Taipei',
  vi: 'Asia/Ho_Chi_Minh',
}

// tricky to use useI18nContext
const UseI18nFn = (rawDate: Date|number, type: string) => {
  const {locale} = useI18nContext()
  const zonedDate = utcToZonedTime(rawDate, timeZone[locale])
  return format(zonedDate, type, {timeZone: timeZone[locale]})
}

export function formatDate(rawDate: Date|number, type: string): string {
  return UseI18nFn(rawDate, type)
}
