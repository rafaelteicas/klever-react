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
          <Button preset="disabled" path={'/'}>
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
                onChange={(e) => field.onChange(e.target.value)}
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
            <Button type="button" onClick={handleSubmit(handleSaveToken)}>
              Save
            </Button>
          </footer>
          <Modal.Container>
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Description>
              Are you sure that you want to delete?
            </Modal.Description>
            <Modal.Footer>
              <Modal.Cancel>Cancel</Modal.Cancel>
              <Modal.Action onClick={handleRemoveToken}>Remove</Modal.Action>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Root>
      </form>
    </section>
  )
}
