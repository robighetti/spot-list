import { FaHome } from 'react-icons/fa'
import { BiSolidPlaylist } from 'react-icons/bi'
import { ImExit } from 'react-icons/im'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/auth'

import { Container, Content, List, ListItem, ExitButton } from './styles'

export const Aside = () => {
  const navigate = useNavigate()

  const { signOut } = useAuth()

  return (
    <Container>
      <Content>
        <List>
          <ListItem onClick={() => navigate('/home')}>
            <FaHome />
            <span>Home</span>
          </ListItem>

          <ListItem onClick={() => navigate('/playlist')}>
            <BiSolidPlaylist />
            <span>Playlist</span>
          </ListItem>
        </List>

        <ExitButton onClick={signOut}>
          <span>
            <ImExit />
            Sair
          </span>
        </ExitButton>
      </Content>
    </Container>
  )
}
