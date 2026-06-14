import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LocaleProvider, useLocale, useT } from './LocaleContext'

function Probe() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  return (
    <div>
      <span data-testid="h">{t.pains.heading}</span>
      <span data-testid="l">{locale}</span>
      <button onClick={() => setLocale('kz')}>kz</button>
    </div>
  )
}

describe('LocaleContext', () => {
  it('defaults to ru and switches to kz', () => {
    render(<LocaleProvider><Probe /></LocaleProvider>)
    expect(screen.getByTestId('l').textContent).toBe('ru')
    expect(screen.getByTestId('h').textContent).toBe('Знакомо?')
    fireEvent.click(screen.getByText('kz'))
    expect(screen.getByTestId('l').textContent).toBe('kz')
    expect(screen.getByTestId('h').textContent).toBe('Таныс па?')
  })
})
