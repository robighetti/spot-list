import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;

  grid-template-columns: auto 30%;
  grid-template-rows: 20% auto;

  grid-template-areas:
    'HE HE'
    'CT AS';

  height: 100vh;
`
