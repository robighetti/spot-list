/* eslint-disable prettier/prettier */
import styled, {css} from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.primary_light};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 16px;
  width: 100%;
  color: ${({ theme }) => theme.background};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props => props.isFocused && css`
    color: ${({ theme }) => theme.secondary};
    border-color: ${({ theme }) => theme.secondary};
  `}

  ${props => props.isFilled && css`
    color: ${({ theme }) => theme.secondary};
  `}

  svg {
    margin-right: 16px;
  }

  input {
    background: transparent;
    border: 0;
    font-size: 16px;
    width: 100%;

    ${props => props.isFilled && css`
    color: ${({ theme }) => theme.secondary};
  `}
    

    &::placeholder {
      color: ${({ theme }) => theme.gray};
    }
  }
`

export const Error = styled.div`
  margin-left: 16px;
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: ${({ theme }) => theme.error_title};

    &::before {
      border-color: ${({ theme }) => theme.error_title} transparent;
    }
  }
`