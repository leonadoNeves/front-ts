import styled, { css } from 'styled-components';

interface SidebarProps {
  isSideBarOpen: boolean | undefined;
}

export const ContainerSideBar = styled.div<SidebarProps>`
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme['green-100']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme['green-200']};
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme['green-100']};
  }

  .sideBar {
    height: 100%;
    background-color: ${({ theme }) => theme['green-100']};
  }

  .sideBar__menu {
    background-color: ${({ theme }) => theme['green-100']};
    color: ${({ theme }) => theme['gray-100']};

    ul {
      background-color: ${({ theme }) => theme['green-200']} !important;

      li {
        padding-left: 20px !important;
        background-color: transparent;

        span {
          color: ${({ theme }) => theme['gray-100']};
        }
      }
    }
  }

  ${({ isSideBarOpen }) => {
    switch (isSideBarOpen) {
      case true:
        return css`
          .sideBar__menu {
            margin-top: 2rem;
            padding-top: 10px;
          }
        `;

      default:
        return css`
          .sideBar__menu {
            padding-top: 20px;
          }
        `;
    }
  }}
`;

export const ContainerUserData = styled.div<SidebarProps>`
  ${({ isSideBarOpen }) => {
    switch (isSideBarOpen) {
      case true:
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 75px;
          background-color: #004645;

          .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            .container__imageContainer {
              margin-top: 0px;
              img {
                width: 45px;
              }
            }

            .container__userName {
              color: ${({ theme }) => theme['gray-100']};
              font-weight: 500;
              margin-top: 5px;
            }

            .container__roleName {
              color: ${({ theme }) => theme['gray-400']};
              font-size: 0.9rem;
            }
          }
        `;

      default:
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 130px;
          background: linear-gradient(to bottom, #004645 40%, #0d7c84 40%);

          .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            .container__imageContainer {
              margin-top: 0px;
              img {
                width: 90px;
              }
            }

            .container__userName {
              color: ${({ theme }) => theme['gray-100']};
              font-weight: 500;
              margin-top: 5px;
            }

            .container__roleName {
              color: ${({ theme }) => theme['gray-400']};
              font-size: 0.9rem;
            }
          }
        `;
    }
  }}
`;

export const ContainerLogout = styled.div`
  background-color: ${({ theme }) => theme['green-200']};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;

  button {
    border-radius: 50%;
    background-color: black;
    border: none;
    margin: 10px 20px 0px 0px;
    padding: 7px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      color: ${({ theme }) => theme['gray-100']};
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;
