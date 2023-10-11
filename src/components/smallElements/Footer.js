import stylesHeader from '../../styles/HeaderFooter.module.css';
import { useRouter } from 'next/router';

////////////////////////////////////////////////////////////////////////////////

const Footer = () => {

  return (
    <div className={stylesHeader.footerContainer}>
      Ceci est le footer
    </div>
  )
}

export default Footer;