import { useWallet } from '@context'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { EditTokenSchema } from './edit-token-schema'

type EditToken = EditTokenSchema & { id: string }

export const useEditToken = () => {
  const { editToken } = useWallet()
  const navigate = useNavigate()

  const { mutate } = useMutation<void, Error, EditToken>({
    mutationFn: (data) => editToken(data.id, data.balance),
    onSuccess: () => {
      navigate('/')
    },
  })

  return {
    editToken: mutate,
  }
}
