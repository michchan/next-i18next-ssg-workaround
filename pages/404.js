import { useRouter } from "next/router";

const FALLBACK_LANG = "en";
const isValidLocale = (locale) => ["en", "zh"].includes(locale);
const isWithBackslash = (path) => /\/$/.test(path);
const isClientSide = () => typeof window !== "undefined";

const parseRawPath = (path) => {
  // Assume the first segment is locale
  const [locale, ...restSegments] = path.replace(/(^\/)|(\/$)/, "").split("/");
  if (isValidLocale(locale))
    return { locale, pathname: restSegments.join("/") };
  // Otherwise, join the first segment as pathname as well
  return {
    locale: null,
    pathname: [locale, ...restSegments].join("/"),
  };
};

const Custom404 = () => {
  const router = useRouter();

  // Make sure we're in the browser
  if (isClientSide()) {
    const { locale, pathname } = parseRawPath(router.asPath);

    const redirectPath = isWithBackslash(router.asPath)
      ? // Try to redirect when pathname is with backslash
        // Like "/en/home/" -> "/en/home"
        // As our static CDN host might not be supporting that.
        pathname
      : // Need to redirect to the 404 page with "locale" as
        // Server side locale is not support in SSG.
        "not-found";

    router.replace(`${locale || FALLBACK_LANG}/${redirectPath}`);
  }
  return <div>loading...</div>;
};
Custom404.displayName = "Custom404";

export default Custom404;
