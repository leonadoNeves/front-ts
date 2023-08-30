import { styled } from 'styled-components';

export const BrandCrumbContainer = styled.div`
  margin-left: 30px;
  display: flex;
  padding: 20px 0px;

  ol {
    li {
      span {
        font-weight: 600;
        font-size: 1rem;
      }

      a {
        display: flex;
        align-items: center;
      }
    }
  }
`;
