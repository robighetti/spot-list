import { useCallback, useRef, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft, AiFillLock } from 'react-icons/ai'

import { Form } from '@unform/web'

import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import { useToast } from '../../shared/hooks/Toast'
import { Input, Button } from '../../shared/components'
import { resetPassword } from '../../api/spot-list-api'

import logo from '../../assets/logo.png'

import { Container, Content, Background } from './styles'

export const ResetPasssword = () => {
  const formRef = useRef(null)

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const { token } = useParams()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Senha com mínimo de 6 caracteres'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords precisam ser iguais',
          ),
        })

        await schema.validate(formData, { abortEarly: false })

        const { password } = formData

        await resetPassword({ token, password })

        addToast({
          type: 'success',
          title: 'Senha resetada com sucesso',
        })

        navigate('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Erro no Reset',
          description:
            'Ocorreu um erro ao fazer o reset de senha, verifique seu email e informe o token correto',
        })
      }
    },
    [addToast, token],
  )

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])

  return (
    <Container>
      <Content>
        <img src={logo} alt="SpotList" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input
            name="password"
            placeholder="Digite sua senha"
            icon={AiFillLock}
            type={showPassword ? 'text' : 'password'}
          />

          <Input
            name="password_confirmation"
            placeholder="Confirme sua senha"
            icon={AiFillLock}
            type={showPassword ? 'text' : 'password'}
          />
          <span onClick={handleShowPassword}>Mostrar senha</span>

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
