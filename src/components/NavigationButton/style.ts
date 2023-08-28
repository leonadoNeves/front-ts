import { styled } from 'styled-components';

export const ButtonContainer = styled.div`
  .buttonNavigation {
    width: 200px;
    height: 130px;
    background: linear-gradient(#0a737b, #16838b);
    border-radius: 8px;
    border: 0px;
    box-shadow: 2px 2px 1px #2b2b2b40;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    transition: 0.3s;

    &:hover {
      transform: translate(3px, 5px);
      background: linear-gradient(#0a737b, #16838b);
      background-size: 100% 100%;
      box-shadow: 8px 8px 12px #00000045;
      transition: 0.6s;
    }

    h3 {
      margin-top: 4px;
      font-size: 15px;
      color: ${({ theme }) => theme['gray-100']};
      font-weight: 400;
      text-align: center;
      max-width: 300px;
      white-space: wrap;
    }
  }
`;
