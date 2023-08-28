// icon={InstalationImg}
//           menuItem="cadastrosBasicos"
//           label="instalacoes"
//           type="primary"

import { styled } from 'styled-components';

export const ButtonContainer = styled.div`
  .buttonNavigation {
    width: 200px;
    height: 130px;
    background-color: ${({ theme }) => theme['green-100']};
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
      background: linear-gradient(-65deg, #0a737b, #0d7c84);
      background-size: 100% 100%;
      box-shadow: 8px 8px 12px #00000045;
      transition: 0.6s;
    }

    h3 {
      font-size: 16px;
      color: ${({ theme }) => theme['gray-100']};
      font-weight: 400;
      text-align: center;
      max-width: 300px;
      white-space: wrap;
    }
  }
`;
