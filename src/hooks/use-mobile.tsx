
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initial check
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isTablet
}

export function useBreakpoint(breakpoint: number) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const onChange = () => {
      setIsAboveBreakpoint(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsAboveBreakpoint(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isAboveBreakpoint
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => {
      setMatches(media.matches)
    }
    
    media.addEventListener("change", onChange)
    setMatches(media.matches)
    return () => media.removeEventListener("change", onChange)
  }, [query])

  return !!matches
}

export function usePrefersDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
