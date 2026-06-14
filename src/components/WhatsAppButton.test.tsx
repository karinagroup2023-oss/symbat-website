import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocaleProvider } from '../i18n/LocaleContext'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('links to wa.me with the number and prefilled text', () => {
    render(<LocaleProvider><WhatsAppButton /></LocaleProvider>)
    const a = screen.getByRole('link')
    expect(a).toHaveAttribute('href', expect.stringContaining('https://wa.me/77019539376?text='))
    expect(a.getAttribute('href')).toContain(encodeURIComponent('Сымбат'))
    expect(a).toHaveAttribute('target', '_blank')
  })
})
