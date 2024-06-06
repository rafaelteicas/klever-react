import { useWallet } from '@context'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useRemoveToken = () => {
  const { removeToken } = useWallet()
  const navigate = useNavigate()

  const { mutate } = useMutation<void, Error, string>({
    mutationFn: (id) => removeToken(id),
    onSuccess: () => {
      navigate('/')
    },
  })

  return {
    removeToken: mutate,
  }
}
