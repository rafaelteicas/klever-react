import { Edit } from '@assets'
import { useWallet } from '@context'
import { Link } from 'react-router-dom'

export function Wallet() {
  const { wallet } = useWallet()

  return (
    <section className="py-8">
      {wallet?.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="text-2xl font-bold">
              <td></td>
              <td>Tokens</td>
              <td className="text-end">Balance</td>
            </tr>
          </thead>
          <tbody>
            {wallet.map(({ id, token }) => (
              <tr className="text-2xl font-bold" key={id}>
                <td>
                  <Link data-testid="button-edit" to={`/edit-token?id=${id}`}>
                    <Edit className="size-5" />
                  </Link>
                </td>
                <td className="uppercase">{token.name}</td>
                <td className="text-end font-bold uppercase">
                  {token.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Não há tokens</h2>
      )}
    </section>
  )
}
