import styled from 'styled-components'

export const ButtonContainer = styled.button`
  background: ${({ theme }) => theme.primary};

  height: 48px;
  border: 0;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 16px;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px ${({ theme }) => theme.background};
  }
`
