import { fireEvent, render } from 'test-utils'

import { Button } from './button'

const mocks = vi.hoisted(() => {
  return {
    mockedUseNavigate: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mocks.mockedUseNavigate,
  }
})

describe('<Button />', () => {
  it('should not click when button is disabled', () => {
    const mockedOnClick = vi.fn()

    const { getByText } = render(
      <Button disabled onClick={mockedOnClick}>
        Button
      </Button>,
    )
    const btn = getByText('Button')
    fireEvent.click(btn)
    expect(mockedOnClick).not.toHaveBeenCalled()
  })

  it('should be red if preset button is secondary', () => {
    const { getByTestId } = render(<Button preset="secondary">Button</Button>)
    const btn = getByTestId(/Button/i)
    expect(btn.className).toContain('bg-error')
  })
  it('should be gray if preset button is disabled', () => {
    const { getByTestId } = render(
      <Button preset="disabled" disabled>
        Button
      </Button>,
    )
    const btn = getByTestId(/Button/i)
    expect(btn.className).toContain('bg-disabled')
  })
})
