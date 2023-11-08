import stylesHeader from '../../styles/HeaderFooter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { noelLogos } from '@/utils/noelLogos';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWindowSize } from '../../reducers/windowSize';

const Header = () => {

  const dispatch = useDispatch();

  const noelLogosJsx = noelLogos.map((data, i) => {
    return <div key={i}> {data}</div>;
  });

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      dispatch(updateWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    }

    // Écouter les événements de redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Mettre à jour la taille de la fenêtre initialement
    handleResize();

    // Nettoyer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={stylesHeader.headerTop}></div>
      <div className={stylesHeader.headerContainer}>
        {windowSize.width < 480
          ? noelLogosJsx.slice(0, 8) :
          windowSize.width < 768 ?
            noelLogosJsx.slice(0, 10) :
            noelLogosJsx
        }
        <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px", color: "darkred" }}></FontAwesomeIcon>
      </div>
    </>
  );
}

export default Header;