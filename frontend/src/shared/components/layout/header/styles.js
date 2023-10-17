import styled from 'styled-components'

export const Container = styled.div`
  grid-area: HE;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 40px;
`
export const ImageContainer = styled.div``

export const Image = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1.5);
`
export const GreatingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  }

  span {
    font-size: 18px;
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
  }
`
