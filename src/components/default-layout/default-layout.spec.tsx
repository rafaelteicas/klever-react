import { render } from 'test-utils'

import { DefaultLayout } from './default-layout'

describe('<DefaultLayout />', () => {
  it('should render the DefaultLayout', () => {
    const result = render(<DefaultLayout />)
    expect(result).toBeTruthy()
  })
})
