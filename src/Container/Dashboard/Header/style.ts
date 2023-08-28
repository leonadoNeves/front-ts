import styled, { css } from 'styled-components';

interface SidebarProps {
  isSideBarOpen: boolean;
}

export const HeaderPageContainer = styled.header<SidebarProps>`
  .headerPage {
    background-color: ${({ theme }) => theme['green-300']};
    height: 85px;
    display: flex;
    align-items: center;

    .headerPage__containerlogo {
      display: flex;
      align-items: center;
    }

    .headerPage__containerIconMenu {
      margin-left: 30px;
      display: flex;
      align-items: center;

      .containerIconMenu__icon {
        color: ${({ theme }) => theme['gray-100']};
        font-size: 1.3rem;
        cursor: pointer;
      }
    }

    @media (max-width: 768px) {
      justify-content: space-between;

      .containerIconMenu__icon {
        margin-right: -32px;
      }
    }
  }

  ${({ isSideBarOpen }) => {
    switch (isSideBarOpen) {
      case true:
        return css`
          .headerPage {
            padding-left: 12px;

            .headerPage__containerlogo img {
              width: 60px;
            }
          }
        `;

      default:
        return css`
          .headerPage {
            padding-left: 25px;

            .headerPage__containerlogo img {
              width: 150px;
            }
          }
        `;
    }
  }}
`;
