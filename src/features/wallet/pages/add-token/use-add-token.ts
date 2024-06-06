import { useWallet } from '@context'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { AddTokenSchema } from './add-token-schema'

export const useAddToken = () => {
  const { addToken } = useWallet()
  const navigate = useNavigate()

  const { mutate, error } = useMutation<void, Error, AddTokenSchema>({
    mutationFn: (data) => addToken(data),
    onSuccess: () => {
      navigate('/')
    },
  })

  return {
    addToken: mutate,
    errorMessage: error?.message,
  }
}
