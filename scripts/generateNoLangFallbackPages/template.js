import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { i18n } from '../next-i18next.config'

const NoLangFallbackPage = () => {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined')
    router.replace(`${i18n.defaultLocale}/${router.pathname}`)

  return null
}

NoLangFallbackPage.displayName = 'NoLangFallbackPage'

export default NoLangFallbackPage