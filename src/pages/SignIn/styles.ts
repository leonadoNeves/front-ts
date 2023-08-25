import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const Image = styled.img`
  height: 100vh;
  max-width: 100%;
  object-fit: cover;

  @media (max-width: 1200px) {
    display: none;
  }
`;
