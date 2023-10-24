/* eslint-disable no-template-curly-in-string */
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useAuth } from '../../../hooks/auth'

import {
  Container,
  Content,
  ImageContainer,
  Image,
  GreatingsContainer,
  ActionsProfileContainer,
} from './styles'

export const Header = () => {
  const { user } = useAuth()
  const theme = useTheme()

  return (
    <Container>
      <Content>
        <ImageContainer>
          <Image
            src={
              user.avatar
                ? user.avatar
                : `https://ui-avatars.com/api/?font-size=0.33&background=${theme.background.substring(
                    1,
                    theme.background.length,
                  )}&color=${theme.contrast.substring(
                    1,
                    theme.contrast.length,
                  )}&name=${user.name}`
            }
            alt={user.name}
          />
        </ImageContainer>

        <GreatingsContainer>
          <strong>Olá, </strong>
          <ActionsProfileContainer>
            <Link to="/profile">
              <FiEdit />

              <span>{user.name}</span>
            </Link>
          </ActionsProfileContainer>
        </GreatingsContainer>
      </Content>
    </Container>
  )
}
