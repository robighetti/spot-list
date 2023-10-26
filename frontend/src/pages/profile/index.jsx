import { useCallback, useRef } from 'react'
import { FiCamera } from 'react-icons/fi'

import { BaseLayout } from '../../shared/layouts/BaseLayout/BaseLayout'
import { Input } from '../../shared/components'

import {
  Container,
  Header,
  Image,
  ImageContainer,
  ButtonImage,
  FormContainer,
} from './styles'

export const Profile = () => {
  const formRef = useRef(null)

  const handleSubmit = useCallback(() => {
    console.log('submit')
  }, [])

  return (
    <BaseLayout>
      <Container>
        <Header>
          <ImageContainer>
            <Image
              src="https://avatars.githubusercontent.com/u/45999236?v=4"
              alt="Rodrigo Bighetti"
            />

            <ButtonImage htmlFor="picture">
              <FiCamera />
              <input type="file" id="picture" />
            </ButtonImage>
          </ImageContainer>

          <span>Rodrigo Bighetti</span>
        </Header>

        <FormContainer ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />

          <div>
            <hr />
            <span>Alteração de senha</span>
            <hr />
          </div>

          <Input
            name="old_password"
            type="password"
            placeholder="Senha antiga"
          />
          <Input name="password" type="password" placeholder="Nova Senha" />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirme sua Senha"
          />
        </FormContainer>
      </Container>
    </BaseLayout>
  )
}
