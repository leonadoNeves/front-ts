import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .Error {
    text-align: center;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .texto {
    font-size: 50px;
    justify-content: center;
    text-align: center;
    color: ${({ theme }) => theme['gray-700']};
    margin: 2rem 0;
  }

  .subtitle {
    font-size: 20px;
    justify-content: center;
    text-align: center;
    color: ${({ theme }) => theme['gray-600']};
    margin-bottom: 1rem;
  }

  .botao {
    color: ${({ theme }) => theme['gray-100']};
    background: ${({ theme }) => theme['green-100']};
    height: 50px;
    border: none;
    inline-size: 150px;
    border-radius: 5px;
    width: 100%;
    max-width: 200px;
    margin-top: 1rem;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .botao:hover {
    background-color: ${({ theme }) => theme['green-200']};
  }

  @keyframes vertical {
    0% {
      top: 0px;
    }
    50% {
      top: 80px;
    }
    100% {
      top: 0px;
    }
  }

  @keyframes verticalC {
    0% {
      top: 0px;
      height: 100px;
    }
    50% {
      top: 80px;
      height: 0px;
    }
    100% {
      top: 0px;
      height: 100px;
    }
  }

  @keyframes verticalR {
    0% {
      top: 30px;
    }
    50% {
      top: -37px;
      height: 95px;
    }
    100% {
      top: 30px;
    }
  }

  @keyframes verticalR2 {
    0% {
      top: 35px;
    }
    50% {
      top: -40px;
      height: 100px;
    }
    100% {
      top: 35px;
    }
  }

  @keyframes diagonal {
    0% {
      -moz-transform: rotateZ(20deg);
      -ms-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
    }
    50% {
      -moz-transform: rotateZ(-20deg);
      -ms-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
    }
    100% {
      -moz-transform: rotateZ(20deg);
      -ms-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
    }
  }

  @keyframes girar {
    0% {
      -moz-transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    50% {
      -moz-transform: rotateZ(180deg);
      -ms-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
      margin-top: -50px;
    }
    100% {
      -moz-transform: rotateZ(360deg);
      -ms-transform: rotateZ(360deg);
      transform: rotateZ(360deg);
    }
  }

  .animacao {
    margin-left: 620px;
    margin-right: 580px;
    margin-top: 100px;
    width: 400px;
  }

  .topo {
    width: 250px;
    height: 8px;
    margin-left: 65px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
    animation-name: diagonal;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .extrator {
    width: 25px;
    height: 60px;
    margin-left: 60px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
    animation-name: vertical;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .base {
    height: 100px;
    width: 20px;
    margin-left: 180px;
    margin-top: -4px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
  }

  .cabo1 {
    height: 50px;
    margin-left: 105px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
    animation-name: verticalR;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    float: left;
  }

  .cabo2 {
    height: 50px;
    margin-left: 115px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
    animation-name: verticalR2;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .cabo3 {
    height: 70px;
    margin-top: -15px;
    margin-left: 70px;
    position: relative;
    border-style: solid;
    background-color: ${({ theme }) => theme['gray-700']};
    border-color: ${({ theme }) => theme['gray-700']};
    animation-name: verticalC;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    float: left;
  }

  .contrapeso {
    width: 0;
    height: 0;
    margin-top: 10px;
    margin-left: 73px;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 40px solid ${({ theme }) => theme['gray-700']};
    transform: rotate(350deg);
    animation-name: girar;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
`;
