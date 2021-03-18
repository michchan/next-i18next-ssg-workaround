import { useRouter } from 'next/router'
import { i18n } from '../next-i18next.config'

const HomeFallback = () => {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined')
    // @TODO: Use locale on localStorage / browser preference
    router.replace(`${i18n.defaultLocale}/${router.pathname}`)

  return null 
}

export default HomeFallback