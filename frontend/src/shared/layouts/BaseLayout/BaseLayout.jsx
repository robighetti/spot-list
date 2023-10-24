import { Button } from '../../components'

import {
  Container,
  ToolbarContainer,
  ActionButtonContainer,
  EndButtonContainer,
} from './styles'

export const BaseLayout = ({ children }) => {
  return (
    <Container>
      <ToolbarContainer>
        <ActionButtonContainer>
          <Button>Salvar</Button>

          <Button>Novo</Button>
        </ActionButtonContainer>

        <EndButtonContainer>
          <Button>Voltar</Button>
        </EndButtonContainer>
      </ToolbarContainer>

      {children}
    </Container>
  )
}
