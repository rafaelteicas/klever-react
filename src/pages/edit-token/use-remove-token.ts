import { useWallet } from '@context'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useRemoveToken = () => {
  const { removeToken } = useWallet()
  const navigate = useNavigate()

  const { mutate } = useMutation<void, Error, string>({
    mutationFn: (id) => removeToken(id),
    onSuccess: () => {
      navigate('/')
      toast.success('Success!', { position: 'bottom-right' })
    },
  })

  return {
    removeToken: mutate,
  }
}
