import styled from 'styled-components'

export const Container = styled.div`
  grid-area: HE;

  background: ${({ theme }) => theme.background};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 40px;

  height: 100%;
`

export const ImageContainer = styled.div``

export const Image = styled.img`
  width: 70px;
  height: 70px;

  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
`
export const GreatingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.contrast};
    font-weight: 600;
  }
`

export const ActionsProfileContainer = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.contrast};

  cursor: pointer;

  svg {
    font-size: 20px;
    margin-right: 8px;
    color: ${({ theme }) => theme.contrast};
  }

  span {
    font-size: 18px;
    color: ${({ theme }) => theme.contrast};
    font-weight: 500;
  }

  > a {
    &:active {
      text-decoration: none;
      color: inherit;
    }
  }

  transition: all 0.3s;

  &:hover {
    scale: 1.1;
  }
`
