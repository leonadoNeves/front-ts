import styled from 'styled-components';

export const HeaderPageContainer = styled.header`
  .headerPage {
    background-color: ${({ theme }) => theme['green-300']};
    height: 85px;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: space-between;
    }

    .headerPage__containerlogo {
      display: flex;
      align-items: center;
      margin-left: -32px;

      img {
        width: 150px;
      }
    }

    .headerPage__containerIconMenu {
      margin-left: 30px;
      display: flex;
      align-items: center;

      @media (max-width: 768px) {
        margin-left: 0;
        margin-right: -32px;
      }

      .containerIconMenu__icon {
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
`;
