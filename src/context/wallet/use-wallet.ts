import { use } from 'react'

import { WalletContext } from './wallet-provider'

export function useWallet() {
  return use(WalletContext)
}
