import axios, { AxiosRequestHeaders } from 'axios'
import getConfig from 'next/config'
import { NextRequest } from 'next/server'
import Router from 'next/router'
import { GGJ_REDIRECT_CODE } from './constant'
import {IncomingMessage} from 'http'

let options = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}

// if is in server
if (typeof window === 'undefined') {
  const { serverRuntimeConfig } = getConfig()
  options = Object.assign({}, options, {
    baseURL: serverRuntimeConfig.MYACCOUNT_API_URL
  })
}

const http = axios.create(options)

if (typeof window !== 'undefined') {
  const { publicRuntimeConfig } = getConfig()
  http.interceptors.response.use(function(response) {
    return response
  }, async function(error) {
    if (error.response.status === 401) {
      window.location.href = `${publicRuntimeConfig.ACCOUNT_HOST_URL}?u=${window.location.href}`
    }
    if(error?.response?.status === GGJ_REDIRECT_CODE) {
      await Router.push({
        pathname: publicRuntimeConfig.ACCOUNT_HOST_URL,
        query: {u: window.location.href}
      })
      await new Promise(resolve => setTimeout(resolve, 5e3))
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  })
}

export default http

interface IGgjHeader {
  req: NextRequest | IncomingMessage
  headKeys?: Array<string>
}

// using to append request header at server side
export function appendGgjHeader(props: IGgjHeader): AxiosRequestHeaders {
  const {req, headKeys } = props
  let headerKeys = ['au-payload','user-agent', 'x-forwarded-for']
  if(headKeys && headKeys?.length > 0) headerKeys = headerKeys.concat(headKeys)
  const headers = req.headers as unknown as Record<string, string>
  const reqHeader = {} as unknown as Record<string, string>
  headerKeys.forEach(item => headers[item] ? reqHeader[item] = headers[item] : '')
  return reqHeader
}
