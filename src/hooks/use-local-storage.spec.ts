import { act, renderHook } from '@testing-library/react'

import { Storage, useLocalStorage } from './use-local-storage'

const localStorage: Storage<any> = {
  getItem: () => vi.fn(),
  setItem: () => vi.fn(),
  removeItem: () => vi.fn(),
}

Object.defineProperty(window, 'localStorage', localStorage)

describe('useLocalStorage', () => {
  beforeAll(() => {
    const { result } = renderHook(() => useLocalStorage('TEST_KEY'))
    result.current.setItem({ item: 'Test item' })
  })
  it('should return an item when it is passed in setItem()', () => {
    const { result } = renderHook(() => useLocalStorage('TEST_KEY'))
    const items = result.current.getItem()
    expect(items).toStrictEqual({ item: 'Test item' })
  })
  it('should remove an item when it is passed in removeItem()', () => {
    const { result } = renderHook(() => useLocalStorage('TEST_KEY'))
    result.current.removeItem()
    const items = result.current.getItem()
    expect(items).toBeUndefined()
  })
  it('should throw if getItem() throws', () => {
    vi.spyOn(localStorage, 'getItem').mockRejectedValueOnce(new Error('Error'))
    const { result } = renderHook(() => useLocalStorage('TEST_KEY'))
    act(() => result.current.getItem())
  })
})
