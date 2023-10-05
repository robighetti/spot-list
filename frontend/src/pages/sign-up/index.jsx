import { useCallback, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AiFillLock, AiOutlineArrowLeft } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'

import { Form } from '@unform/web'

import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import { Input, Button } from '../../shared/components'

import logo from '../../assets/logo.png'

import { signUp } from '../../api/spot-list-api'

import { Container, Content, Background } from './styles'

export const SignUp = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = useCallback(async (formData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6, 'Senha com mínimo de 6 caracteres'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords precisam ser iguais',
        ),
      })

      await schema.validate(formData, { abortEarly: false })

      const { name, email, password } = formData

      await signUp({ name, email, password })

      navigate('/')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err)

        formRef.current.setErrors(error)
        console.error(err)
        return
      }

      console.error(err)
    }
  }, [])

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])
  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="SpotList" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            icon={FaUserAlt}
          />

          <Input
            name="email"
            type="email"
            placeholder="Digite seu email"
            icon={MdOutlineMail}
          />

          <hr />

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

          <Button type="submit">Entrar</Button>
        </Form>
        <Link to="/">
          <AiOutlineArrowLeft size={24} /> Voltar para login
        </Link>
      </Content>
    </Container>
  )
}
