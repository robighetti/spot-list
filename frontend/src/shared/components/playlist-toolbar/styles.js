import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px;

  border-radius: 4px;

  background: ${({ theme }) => theme.primary_light};

  margin-bottom: 8px;
`
