import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme['gray-700']};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Subtitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme['gray-600']};
  margin-bottom: 2rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 530px;
  border-radius: ${({ theme }) => theme.radius};

  @media (max-width: 768px) {
    height: 450px;
  }
`;
