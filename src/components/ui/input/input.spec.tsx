import { render } from 'test-utils'

import { Input } from './input'

describe('<Input />', () => {
  it('should render an input with a label', () => {
    const { getByText } = render(<Input label="label" />)
    const label = getByText('label')
    expect(label).toBeTruthy()
  })
  it('should contain an errorMessage and border-error if errorMessage is provided', () => {
    const { getByText, queryByTestId } = render(
      <Input label="label" errorMessage="error" />,
    )
    const label = getByText('error')
    expect(label.className).toContain('text-error')

    const input = queryByTestId(/input/i)
    expect(input?.className).toContain('border-error')
  })
})
