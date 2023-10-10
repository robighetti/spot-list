import styled from 'styled-components'

import background from '../../assets/background.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 700px;

  img {
    width: 350px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 440px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    > button {
      margin-top: 24px;
    }

    > span {
      color: ${({ theme }) => theme.text};
      font-weight: 500;
      margin-top: 6px;
      text-align: right;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(4px);
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.primary};
    display: block;
    margin-top: 24px;

    transition: all 0.3s;

    display: flex;
    align-items: center;

    svg {
      margin-left: 16px;
    }

    &:hover {
      transform: scale(1.02);
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`
