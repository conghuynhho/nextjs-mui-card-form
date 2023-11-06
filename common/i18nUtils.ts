import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextRequest } from 'next/server'

export async function ggjServerSideTranslations(
  req: NextRequest,
  ns: string[] | string
) {
  if (typeof ns == 'string') {
    ns = [ns]
  }
  // add common i18n
  ns.push('common@common-layout')

  return serverSideTranslations((req as unknown as {cookies: {ggj_lang: string}}).cookies?.ggj_lang || 'en', ns)
}
