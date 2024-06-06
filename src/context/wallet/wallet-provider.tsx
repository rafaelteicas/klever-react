import { useLocalStorage } from '@hooks'
import { TokenAlreadyInWallet } from '@utils'
import React, { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Token, Wallet, WalletContextType } from './wallet-type'

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType,
)

const WALLET_STORAGE_KEY = 'KLEVER_WALLET'

export function WalletProvider({ children }: React.PropsWithChildren) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const storage = useLocalStorage<Wallet[]>(WALLET_STORAGE_KEY)
  const wallet = storage.getItem() || []

  async function addToken(token: Token) {
    try {
      const tokenAlreadyExists = wallet.some(
        (item) => item.token.name.toLowerCase() === token.name.toLowerCase(),
      )
      if (tokenAlreadyExists) {
        throw new TokenAlreadyInWallet()
      }
      const newToken: Wallet = {
        id: uuid(),
        token: {
          name: token.name,
          balance: token.balance,
        },
      }
      wallet.push(newToken)
      storage.setItem(wallet)
    } catch (error) {
      if (error instanceof TokenAlreadyInWallet) {
        setErrorMessage(error.message)
      }
      throw error
    } finally {
      setErrorMessage('')
    }
  }

  async function editToken(id: string, balance: string) {
    const tokenInLocalStorage = wallet.findIndex((item) => item.id === id)
    if (tokenInLocalStorage >= 0) {
      wallet[tokenInLocalStorage].token.balance = balance
      storage.setItem(wallet)
    }
  }

  async function removeToken(tokenId: string) {
    const token = wallet.findIndex((token) => token.id === tokenId)

    if (token >= 0) {
      wallet.splice(token, 1)
      storage.setItem(wallet)
    }
  }

  function getTokenById(tokenId: string) {
    const token = wallet.find((token) => token.id === tokenId)
    return token ? token : null
  }

  return (
    <WalletContext
      value={{
        wallet,
        errorMessage,
        addToken,
        editToken,
        removeToken,
        getTokenById,
      }}
    >
      {children}
    </WalletContext>
  )
}
