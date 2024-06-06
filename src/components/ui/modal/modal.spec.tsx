import { fireEvent, render, waitFor } from 'test-utils'

import { Modal } from './modal'

describe('<Modal />', () => {
  it('should open a modal if trigger is pressed', () => {
    const { getByText } = render(
      <Modal.Root>
        <Modal.Trigger asChild={false}>Abrir</Modal.Trigger>
        <Modal.Container>
          <Modal.Header>Modal title</Modal.Header>
          <Modal.Description>Modal content</Modal.Description>
        </Modal.Container>
      </Modal.Root>,
    )
    const btn = getByText(/abrir/i)
    fireEvent.click(btn)
    const heading = getByText('Modal title')
    expect(heading).toBeTruthy()
  })
  it('should close modal when on click outside', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <Modal.Root>
        <Modal.Trigger asChild={false}>Abrir</Modal.Trigger>
        <Modal.Container>
          <Modal.Header>Modal title</Modal.Header>
          <Modal.Description>Modal content</Modal.Description>
        </Modal.Container>
      </Modal.Root>,
    )
    const btn = getByText('Abrir')
    fireEvent.click(btn)
    const outside = getByTestId(/modal-outside/i)
    fireEvent.click(outside)
    const content = queryByText(/Modal content/i)
    expect(content).toBeNull()
  })
  it('should close modal when on click cancel button', async () => {
    const { getByText, queryByText } = render(
      <Modal.Root>
        <Modal.Trigger asChild={false}>Abrir</Modal.Trigger>
        <Modal.Container>
          <Modal.Header>Modal title</Modal.Header>
          <Modal.Description>Modal content</Modal.Description>
          <Modal.Footer>
            <Modal.Cancel>Cancelar</Modal.Cancel>
            <Modal.Action>Enviar</Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Root>,
    )
    const btn = getByText('Abrir')
    fireEvent.click(btn)
    const cancel = getByText(/Cancelar/i)
    fireEvent.click(cancel)
    const content = queryByText(/Modal content/i)
    expect(content).toBeNull()
  })
})
