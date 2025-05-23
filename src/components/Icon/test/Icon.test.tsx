import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Icon, Icons } from '..'

describe('Icon', () => {
  it('should render correctly', () => {
    const { container } = render(<Icon icon={Icons.Success} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
  it('should render a square icon by default', () => {
    const { container } = render(<Icon icon={-1 as Icons} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
