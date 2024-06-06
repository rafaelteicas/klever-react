import { Button, Input, InputMoney, Modal } from '@components'
import { useWallet } from '@context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { EditTokenSchema, editTokenSchema } from './edit-token-schema'
import { useEditToken } from './use-edit-token'
import { useRemoveToken } from './use-remove-token'

export function EditToken() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tokenId = searchParams.get('id')
  const { getTokenById } = useWallet()
  const appToken = getTokenById(tokenId!)

  const { control, handleSubmit } = useForm<EditTokenSchema>({
    resolver: zodResolver(editTokenSchema),
    defaultValues: {
      balance: appToken?.token.balance,
    },
  })

  const { editToken } = useEditToken()
  const handleSaveToken = (token: EditTokenSchema) => {
    editToken({
      id: tokenId!,
      balance: token.balance,
    })
  }

  const { removeToken } = useRemoveToken()
  const handleRemoveToken = () => {
    removeToken(tokenId!)
  }

  useEffect(() => {
    if (!tokenId) {
      navigate('/')
    }
  }, [])

  return (
    <section>
      <form className="flex flex-col justify-between px-16">
        <div className="flex justify-between">
          <h2>Edit Token</h2>
          <Button preset="disabled" onClick={() => navigate('/')}>
            Back
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <Input label="Token" disabled defaultValue={appToken?.token.name} />
          <Controller
            name="balance"
            control={control}
            render={({ field }) => (
              <InputMoney
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                label="Balance"
              />
            )}
          />
        </div>

        <Modal.Root>
          <footer className="mt-8 flex flex-row justify-between">
            <Modal.Trigger>
              <Button preset="secondary" type="button">
                Remove
              </Button>
            </Modal.Trigger>
            <Button type="submit" onSubmit={handleSubmit(handleSaveToken)}>
              Save
            </Button>
          </footer>
          <Modal.Container>
            <Modal.Header>Você tem certeza?</Modal.Header>
            <Modal.Description>
              Tem certeza que deseja remover o token?
            </Modal.Description>
            <Modal.Footer>
              <Modal.Cancel>Cancelar</Modal.Cancel>
              <Modal.Action onClick={handleRemoveToken}>Remover</Modal.Action>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Root>
      </form>
    </section>
  )
}