import { cn } from '@utils'
import { NumericFormat } from 'react-number-format'

import { InputContainer, InputProps } from '../input/input'

type InputMoneyProps = InputProps & {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    originalValue: number | string,
    maskedValue: number | string,
  ) => void
  value: string | number | null | undefined
}

export const InputMoney = ({
  value,
  onChange,
  ...inputProps
}: InputMoneyProps) => {
  return (
    <InputContainer {...inputProps}>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        value={value}
        onChange={onChange}
        className={cn('h-input rounded p-2 font-bold uppercase text-dark', {
          'border-error border': !!inputProps.error,
        })}
      />
    </InputContainer>
  )
}
