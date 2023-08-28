import styled, { css } from 'styled-components';

interface SidebarProps {
  isSideBarOpen: boolean | undefined;
}

const HeaderPageContainer = styled.header<SidebarProps>`
  ${({ isSideBarOpen }) => {
    switch (isSideBarOpen) {
      case true:
        return css`
          .headerPage {
            background-color: ${({ theme }) => theme['green-300']};
            height: 85px;
            display: flex;
            align-items: center;
            padding-left: 12px;

            .headerPage__containerlogo {
              display: flex;
              align-items: center;

              img {
                width: 60px;
              }
            }

            .headerPage__containerIconMenu {
              margin-left: 30px;
              display: flex;
              align-items: center;

              .containerIconMenu__icon {
                color: white;
                font-size: 1.3rem;
                cursor: pointer;
              }
            }
          }
        `;

      default:
        return css`
          .headerPage {
            background-color: ${({ theme }) => theme['green-300']};
            height: 85px;
            display: flex;
            align-items: center;
            padding-left: 25px;

            .headerPage__containerlogo {
              display: flex;
              align-items: center;

              img {
                width: 150px;
              }
            }

            .headerPage__containerIconMenu {
              margin-left: 30px;
              display: flex;
              align-items: center;

              .containerIconMenu__icon {
                color: white;
                font-size: 1.3rem;
                cursor: pointer;
              }
            }
          }
        `;
    }
  }}
`;

export default HeaderPageContainer;
