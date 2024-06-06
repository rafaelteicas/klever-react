export type Token = {
  name: string
  balance: string
}

export type Wallet = {
  id: string
  token: Token
}

export type WalletContextType = {
  wallet: Wallet[]
  errorMessage: string | null
  addToken: (token: Token) => Promise<void>
  editToken: (id: string, balance: string) => Promise<void>
  removeToken: (tokenId: string) => Promise<void>
  getTokenById: (tokenId: string) => Wallet | null
}
