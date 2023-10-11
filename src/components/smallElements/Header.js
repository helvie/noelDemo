import stylesHeader from '../../styles/HeaderFooter.module.css';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

////////////////////////////////////////////////////////////////////////////////

const Header = () => {

  return (
    <div className={stylesHeader.headerContainer}>
    {/* <p className={stylesHeader.specialCharacters}> */}
      <p>&amp;</p> 
      <p>&lt;</p> 
      <p>&brvbar;</p> 
      <p>&dagger;</p> 
      <p>&sect;</p> 
      <p>&copy;</p> 
      <p>&laquo;</p> 
      <p>&amp;</p> 
      <p>&lt;</p> 
      <p>&brvbar;</p> 
      <p>&dagger;</p> 
      <p>&sect;</p> 
      <p>&copy;</p> 
      <FontAwesomeIcon icon={faBars} style={{fontSize:"30px", color:"darkred"}}></FontAwesomeIcon>
    {/* </p> */}
    </div>
      )
}

export default Header;