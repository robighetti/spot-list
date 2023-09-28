import styles from 'styled-components'

export const Container = styles.div`
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid ${({ theme }) => theme.error_title};

    background: ${({ theme }) => theme.error_background};
    color: ${({ theme }) => theme.error_title};

    width: 180px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${({ theme }) => theme.error_title} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
      opacity: 1;
      visibility: visible;
    }
`
