import prioLogo from '@/assets/images/LandingPage/prio.png';

interface ICard {
  title: string;
  imageUrl: string;
  href: string;
  onClick: () => void;
}

export function Card({ title, imageUrl, href, onClick }: ICard) {
  return (
    <a href={href} className="tl-item" onClick={onClick}>
      <div className="tl-bg" style={{ backgroundImage: `url(${imageUrl})` }} />

      {title === 'Botafogo' && (
        <div className="tl-logo">
          <img src={prioLogo} width="206" height="46" />
        </div>
      )}

      <div className="tl-year">
        <p className="f2 heading--sanSerif">{title}</p>
      </div>
    </a>
  );
}
