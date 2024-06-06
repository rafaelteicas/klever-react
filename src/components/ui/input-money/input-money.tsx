import { CurrencyInput } from 'react-currency-mask'

import { Input, InputProps } from '../input/input'

type InputMoneyProps = InputProps & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputMoney = ({
  onChange,
  value,
  ...inputProps
}: InputMoneyProps) => {
  return (
    <CurrencyInput
      value={value?.toString()}
      onChangeValue={onChange}
      InputElement={<Input {...inputProps} />}
    />
  )
}
