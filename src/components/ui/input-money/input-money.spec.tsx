import { act, fireEvent, render } from 'test-utils'

import { InputMoney } from './input-money'

describe('<InputMoney />', () => {
  it('should format a number to currency', async () => {
    const { getByTestId } = render(
      <InputMoney label="Balance" value={0} onChange={() => {}} />,
    )
    const input = getByTestId('input-money') as HTMLInputElement
    await act(async () => fireEvent.change(input, { target: { value: '100' } }))
    expect(input.value).toBe('R$ 100')
  })
})
