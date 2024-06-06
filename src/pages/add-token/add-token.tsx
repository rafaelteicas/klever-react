import { Button, Input, InputMoney } from '@components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AddTokenSchema, addTokenSchema } from './add-token-schema'
import { useAddToken } from './use-add-token'

export function AddToken() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState, control } =
    useForm<AddTokenSchema>({
      resolver: zodResolver(addTokenSchema),
    })

  const { addToken, errorMessage } = useAddToken()
  const handleAddToken = (token: AddTokenSchema) => {
    addToken(token)
  }

  return (
    <section>
      <Helmet title="Add Token" />
      <form className="flex flex-col justify-between px-16">
        <div className="flex justify-between">
          <h2>Add Token</h2>
          <Button preset="disabled" type="button" onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-6">
          <Input
            label="Token"
            {...register('name')}
            error={formState.errors.name?.message || errorMessage}
          />
          <Controller
            name="balance"
            control={control}
            render={({ field, formState }) => (
              <InputMoney
                value={field.value}
                onChange={field.onChange}
                placeholder="R$ 0,00"
                label="Balance"
                error={formState.errors.balance?.message}
              />
            )}
          />
        </div>
        <div className="mt-8 flex flex-row justify-end">
          <Button type="submit" onClick={handleSubmit(handleAddToken)}>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
