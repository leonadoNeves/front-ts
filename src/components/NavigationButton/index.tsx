import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './style';

interface iNavigationButton {
  menuItem: string;
  label: string;
  icon: string;
  href: string;
}

export const NavigationButton = ({
  href,
  menuItem,
  label,
  icon,
}: iNavigationButton) => {
  return (
    <Link to={`/${menuItem}/${href}`}>
      <ButtonContainer>
        <Button className="buttonNavigation">
          {icon && (
            <img src={icon} style={{ maxWidth: '100%', height: '3.25rem' }} />
          )}

          <h3>{label}</h3>
        </Button>
      </ButtonContainer>
    </Link>
  );
};
