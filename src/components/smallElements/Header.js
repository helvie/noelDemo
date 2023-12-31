import stylesHeader from '../../styles/HeaderFooter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { noelLogosJsx } from '@/utils/noelLogosJsx';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWindowSize } from '../../reducers/windowSize';

const Header = (props) => {

  const dispatch = useDispatch();

  const {
    openUserDataChange
  } = props;


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

    window.addEventListener('resize', handleResize);

    handleResize();

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
        {props.displayMenu && <FontAwesomeIcon
          icon={faBars}
          className={stylesHeader.miniMenu}
          onClick={openUserDataChange}
        />}
      </div>
    </>
  );
}

export default Header;