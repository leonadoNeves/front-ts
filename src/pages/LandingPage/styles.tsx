import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme['green-100']};

  &:hover .tl-item {
    width: 23.3333%;
  }

  .tl-item {
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    position: relative;
    width: 25%;
    height: 100vh;
    min-height: 600px;
    color: ${({ theme }) => theme['gray-100']};
    overflow: hidden;
    transition: width 0.5s ease;
  }
  .tl-item:hover {
    color: ${({ theme }) => theme['gray-100']};
  }
  .tl-item:before,
  .tl-item:after {
    transform: translate3d(0, 0, 0);
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .tl-item:after {
    background: linear-gradient(
      60.64deg,
      #007b86d9 0%,
      #066b7cd9 44%,
      #10516cd9 100%
    );
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .tl-item:before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 75%
    );
    z-index: 1;
    opacity: 0;
    transform: translate3d(0, 0, 0) translateY(50%);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
  .tl-item:hover {
    width: 30% !important;
  }
  .tl-item:hover:after {
    opacity: 0;
  }
  .tl-item:hover:before {
    opacity: 1;
    transform: translate3d(0, 0, 0) translateY(0);
    transition:
      opacity 1s ease,
      transform 1s ease 0.25s;
  }
  .tl-item:hover .tl-content {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.75s ease 0.5s;
  }
  .tl-item:hover .tl-bg {
    filter: grayscale(0);
  }
  .tl-content {
    transform: translate3d(0, 0, 0) translateY(25px);
    position: relative;
    z-index: 1;
    text-align: center;
    margin: 0 1.618em;
    top: 55%;
    opacity: 0;
  }
  .tl-content h1 {
    font-family:
      'Pathway Gothic One',
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    color: ${({ theme }) => theme['green-100']};
    font-size: 1.44rem;
    font-weight: normal;
  }
  .tl-year {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    border-top: 1px solid ${({ theme }) => theme['gray-100']};
    border-bottom: 1px solid ${({ theme }) => theme['gray-100']};
  }
  .tl-logo {
    position: absolute;
    top: 11%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
  }
  .tl-year p {
    font-family:
      'Pathway Gothic One',
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    font-size: 1.728rem;
    line-height: 0;
    text-transform: uppercase;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .tl-bg {
    transform: translate3d(0, 0, 0);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center center;
    transition: filter 0.5s ease;
    filter: grayscale(100%);
  }
`;
