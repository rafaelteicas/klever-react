export class TokenAlreadyInWallet extends Error {
  constructor() {
    super('Token already exists in wallet!')
    this.name = 'TokenAlreadyInWallet'
  }
}
