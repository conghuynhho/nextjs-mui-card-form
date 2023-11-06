/**
 * This function is using for set cookies in browser.
 */
export function setCookie(
  name: string,
  value = '',
  expiredInMinutes = 24 * 60,
  path = '/',
  domain?: string,
) {
  if (typeof window === 'undefined') {
    return
  }
  const date = new Date()
  date.setTime(date.getTime() + expiredInMinutes * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=${path}; ${domain ? `domain=${domain}` : ''}`
}

/**
 * This function is using for get cookies in browser.
 * If the input "stringCookie" is not provided, this function will get from document.cookie.
*/
export function getCookie(cookieName: string, stringCookie?: string) {
  if (!stringCookie && typeof window === 'undefined') {
    return ''
  }
  const _stringCookie = stringCookie === undefined ? document.cookie : stringCookie
  const cookies = (_stringCookie).split(';')
  for (let i = 0, l = cookies.length; i < l; i++) {
    const parts:Array<string> = cookies[i].split('=') || []
    // compare cookie name
    if (parts.shift()?.trim() == cookieName) {
      return parts.shift() || ''
    }
  }
  return ''
}

/**
 * Debounce function, call once after timeout
 * will reset & re-wait timeout in case re-call before timeout
 * @param fn callback function
 * @param wait in milliseconds
 * @returns {(...args: any) => void}
 */
export function ggjDebounce(fn: any, wait?: number) {
  let timerId: any, lastArguments: any, lastThis: any
  return (...args: any) => {
    timerId && clearTimeout(timerId)
    lastArguments = args
    //@ts-ignore
    lastThis = this
    timerId = setTimeout(function () {
      fn.apply(lastThis, lastArguments)
      timerId = null
    }, wait || 400)
  }
}

/**
 * The native method "Element.scrollIntoView" is not smooth in IOS
 * This function use to "scrollToElSmoothly", support for IOS
 * @param el element scroll to
 * @param duration in milliseconds
 * @param positionOffset control position of element after scroll
 * @param cb callback function
 * @param focusEl if value is true, focus on the element (only working for HTMLInputElement)
 * @returns {(...args: any) => void}
 */
type scrollToElSmoothlyParameter = {
  el: HTMLElement,
  duration?: number,
  positionOffset?: number,
  cb?: () => void,
  focusEl?: boolean,
}
export function scrollToElSmoothly(
  {
    el,
    duration = 300,
    positionOffset,
    cb,
    focusEl = true,
  } : scrollToElSmoothlyParameter
) {
  if(!el) {
    console.error('el is invalid!')
    return
  }
  const elementPos = window.scrollY + el.getBoundingClientRect().top - (positionOffset ?? screen.height*0.3)
  const currentPos = window.scrollY
  let startTime = 0
  window.requestAnimationFrame(function step(currentTime) {
    startTime = !startTime ? currentTime : startTime
    const progress = currentTime - startTime
    if (currentPos < elementPos) {
      window.scrollTo(0, ((elementPos - currentPos) * progress / duration) + currentPos)
    } else {
      window.scrollTo(0, currentPos - ((currentPos - elementPos) * progress / duration))
    }
    if (progress < duration) {
      window.requestAnimationFrame(step)
    } else {
      window.scrollTo(0, elementPos)
      focusEl && el instanceof HTMLInputElement && el.focus()
      cb && cb()
    }
  })
}

export function simpleDecode(code:string) {
  return Buffer.from(code, 'base64').toString('ascii').substr(5)
}
