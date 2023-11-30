import { Divider } from '@mui/material'
import { Button } from '../form/button'

import {
  ToolbarContainer,
  ActionButtonContainer,
  EndButtonContainer,
} from './styles'

export const FormToolbar = ({
  handleSave,
  showSalve = true,

  handleBack,

  handleNew,
  showNew = false,

  handleEdit,
  showEdit = false,

  handleDelete,
  showDelete = false,

  textSalveButton = 'Salvar',
}) => {
  return (
    <ToolbarContainer>
      <ActionButtonContainer>
        {showSalve && <Button onClick={handleSave}>{textSalveButton}</Button>}

        {showSalve && (
          <Divider
            variant="middle"
            orientation="vertical"
            style={{
              margin: '0 16px',
            }}
          />
        )}

        {showNew && <Button onClick={handleNew}>Novo</Button>}

        {showEdit && <Button onClick={handleEdit}>Editar</Button>}

        {showDelete && <Button onClick={handleDelete}>Excluir</Button>}
      </ActionButtonContainer>

      <EndButtonContainer>
        <Button onClick={handleBack}>Voltar</Button>
      </EndButtonContainer>
    </ToolbarContainer>
  )
}
