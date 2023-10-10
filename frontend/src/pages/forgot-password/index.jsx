import { useCallback, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdOutlineMail } from 'react-icons/md'

import { Form } from '@unform/web'

import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import { useToast } from '../../shared/hooks/Toast'
import { Input, Button } from '../../shared/components'
import { forgotPassword } from '../../api/spot-list-api'

import logo from '../../assets/logo.png'

import { Container, Content, Background } from './styles'

export const ForgotPasssword = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
        })

        await schema.validate(formData, { abortEarly: false })

        const { email } = formData

        await forgotPassword({ email })

        addToast({
          type: 'success',
          title: 'Email enviado com sucesso',
        })

        navigate('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Erro no envio do email',
          description: 'Informe um email válido',
        })
      }
    },
    [addToast],
  )
  return (
    <Container>
      <Content>
        <img src={logo} alt="SpotList" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Esqueci minha senha</h1>

          <Input
            name="email"
            type="email"
            placeholder="Digite seu email"
            icon={MdOutlineMail}
          />

          <Button type="submit">Resetar senha</Button>
        </Form>
        <Link to="/">
          Voltar para login <AiOutlineArrowLeft size={24} />
        </Link>
      </Content>

      <Background />
    </Container>
  )
}
