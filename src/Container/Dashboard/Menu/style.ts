import styled from 'styled-components';

export const ContainerSideBar = styled.div`
  .sideBar {
    padding: 0;
    background-color: red;
    background-color: ${({theme}) => };

    .sideBar__userData {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      background: linear-gradient(to bottom, #004645 60%, #0d7c84 40%);
    }
  }
`;

export const ContainerUserData = styled.div`
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
