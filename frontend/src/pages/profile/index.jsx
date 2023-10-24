import { useCallback, useRef } from 'react'

import { Form } from '@unform/web'

import { BaseLayout } from '../../shared/layouts/BaseLayout/BaseLayout'
import { Input, Button } from '../../shared/components'

import { Container } from './styles'

export const Profile = () => {
  const formRef = useRef(null)

  const handleSubmit = useCallback(() => {
    console.log('submit')
  }, [])

  return (
    <Container>
      <BaseLayout>
        <div>
          <header>
            <img
              src="https://avatars.githubusercontent.com/u/45999236?v=4"
              alt="Rodrigo Bighetti"
            />

            <span>Rodrigo Bighetti</span>
          </header>

          <div>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" placeholder="Nome" />
              <Input name="email" placeholder="E-mail" />

              <hr />

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
            </Form>
          </div>
        </div>
      </BaseLayout>
    </Container>
  )
}
