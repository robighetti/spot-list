import { Button } from '../form/button'

import {
  ToolbarContainer,
  ActionButtonContainer,
  EndButtonContainer,
} from './styles'

export const FormToolbar = ({
  handleSave,
  handleBack,
  handleNew,
  showNew = false,
}) => {
  return (
    <ToolbarContainer>
      <ActionButtonContainer>
        <Button onClick={handleSave}>Salvar</Button>

        {showNew && <Button onClick={handleNew}>Novo</Button>}
      </ActionButtonContainer>

      <EndButtonContainer>
        <Button onClick={handleBack}>Voltar</Button>
      </EndButtonContainer>
    </ToolbarContainer>
  )
}
