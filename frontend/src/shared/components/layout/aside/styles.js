import styled from 'styled-components'

export const Container = styled.div`
  grid-area: AS;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.contrast};
`
