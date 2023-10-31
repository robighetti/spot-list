import styled from 'styled-components'

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px;

  border-radius: 4px;

  background: ${({ theme }) => theme.primary_light};

  margin-bottom: 8px;
`

export const ActionButtonContainer = styled.div`
  display: flex;

  > button {
    width: 150px;
    margin-right: 8px;

    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.contrast};
  }
`

export const EndButtonContainer = styled.div`
  display: flex;

  > button {
    width: 150px;
    margin-right: 8px;

    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.contrast};
  }
`
