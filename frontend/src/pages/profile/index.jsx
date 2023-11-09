import { useCallback, useRef, useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import * as Yup from 'yup'

import { BaseLayout } from '../../shared/layouts/BaseLayout/BaseLayout'
import { Input, FormToolbar } from '../../shared/components'

import { useAuth } from '../../shared/hooks/auth'
import { useToast } from '../../shared/hooks/Toast'
import getValidationErrors from '../../shared/utils/getValidationErrors'
import { uploadImage } from '../../api/spot-list-api'
import { environment } from '../../shared/environments'

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

  const theme = useTheme()

  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [picture, setPicture] = useState(() => {
    const appData = JSON.parse(localStorage.getItem(environment.APP_NAME))

    if (appData) {
      return appData.user.avatar
    }

    return ''
  })

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string(),
          confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem ser iguais',
          ),
        })

        await schema.validate(data, { abortEarly: false })

        console.log('funcionou')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        })
      }
    },
    [addToast],
  )

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleUploadImage = useCallback(async (event) => {
    const formData = new FormData()
    formData.append('avatar', event.target.files[0])

    const { data } = await uploadImage(formData)

    // updateUser(data)
    setPicture(data.avatar)
  }, [])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          handleSave={() => formRef.current?.submitForm()}
          handleBack={handleGoBack}
        />
      }
    >
      <Container>
        <Header>
          <ImageContainer>
            <Image
              src={
                picture
                  ? `${environment.URL_API_SPOTLIST + '/files/' + picture}`
                  : `https://ui-avatars.com/api/?font-size=0.33&background=${theme.background.substring(
                      1,
                      theme.background.length,
                    )}&color=${theme.contrast.substring(
                      1,
                      theme.contrast.length,
                    )}&name=${user.name}`
              }
              alt="Rodrigo Bighetti"
            />

            <ButtonImage htmlFor="picture">
              <FiCamera />
              <input type="file" id="picture" onChange={handleUploadImage} />
            </ButtonImage>
          </ImageContainer>

          <span>Rodrigo Bighetti</span>
        </Header>

        <FormContainer ref={formRef} onSubmit={handleSubmit} initialData={user}>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />

          <div>
            <hr />
            <span>Alteração de senha</span>
            <hr />
          </div>

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
