import { Container, ImageContainer, Image, GreatingsContainer } from './styles'

export const Header = () => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="https://avatars.githubusercontent.com/u/45999236?v=4"
          alt="Rodrigo"
        />
      </ImageContainer>

      <GreatingsContainer>
        <strong>Olá, </strong>
        <span>Rodrigo Bighetti</span>
      </GreatingsContainer>
    </Container>
  )
}
