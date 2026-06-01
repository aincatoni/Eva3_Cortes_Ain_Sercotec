'use client'

import Script from 'next/script'
import {memo, useEffect, useEffectEvent, useRef, useState} from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: (code?: string) => void
          theme?: 'light' | 'dark' | 'auto'
        }
      ) => string
      reset: (widgetId?: string) => void
      remove?: (widgetId?: string) => void
    }
  }
}

type TurnstileWidgetProps = {
  siteKey?: string
  resetKey: number
  onTokenChange: (token: string | null) => void
  onError?: (code?: string) => void
}

function TurnstileWidgetInner({siteKey, resetKey, onTokenChange, onError}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [apiLoaded, setApiLoaded] = useState(false)
  const emitTokenChange = useEffectEvent(onTokenChange)

  useEffect(() => {
    if (!apiLoaded || !siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'light',
      callback: (token) => emitTokenChange(token),
      'expired-callback': () => emitTokenChange(null),
      'error-callback': (code) => {
        emitTokenChange(null)
        onError?.(code)
      },
    })
  }, [apiLoaded, onError, siteKey])

  useEffect(() => {
    emitTokenChange(null)

    if (!widgetIdRef.current || !window.turnstile) {
      return
    }

    window.turnstile.reset(widgetIdRef.current)
  }, [resetKey])

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [])

  if (!siteKey) {
    return (
      <p className='rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
        El captcha no esta configurado en este entorno.
      </p>
    )
  }

  return (
    <>
      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        strategy='afterInteractive'
        onLoad={() => setApiLoaded(true)}
      />
      <div ref={containerRef} className='min-h-[65px]' />
    </>
  )
}

export const TurnstileWidget = memo(TurnstileWidgetInner)
