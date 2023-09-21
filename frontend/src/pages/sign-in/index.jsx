import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

import { Form } from '@unform/web'

import { Input, Button } from '../../shared/components'

import logo from '../../assets/logo.png'

import { Container, Content, Background } from './styles'

export const SignIn = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="SpotList" />

        <Form onSubmit={() => console.log('ok')}>
          <h1>Faça seu Login</h1>

          <Input name="email" placeholder="Digite seu email" />

          <Input name="password" placeholder="Digite sua senha" />

          <Button type="submit">Qualquer outro texto</Button>

          <Link to="#">Esqueci minha senha</Link>
        </Form>
        <Link to="/sign-up">
          Criar conta <AiOutlineArrowRight size={24} />
        </Link>
      </Content>

      <Background />
    </Container>
  )
}
