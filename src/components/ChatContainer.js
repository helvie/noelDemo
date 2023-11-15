import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { noelLogos } from '@/utils/noelLogosJsx';
const moment = require('moment');
require('moment/locale/fr');




////////////////////////////////////////////////////////////////////////////////

const ChatContainer = (props) => {

  const [bottomTchatData, setBottomTchatData] = useState('');
  const [bottomTchatInput, setBottomTchatInput] = useState('');
  const [bottomTchatOpen, setBottomTchatOpen] = useState(false);

  const messages = props.messages.map((data, index) => (
    <div key={index}>
      <p className={styles.chatContent}>De <span className={styles.chatName}>{data.login}</span>  :
        <span className={styles.chatText}> {data.contenu} </span>
      </p>
      <p className={styles.chatDate}>({moment(data.date * 1000).format("ddd DD/MM/YYYY à HH[h]mm")})</p>

    </div>))

  return (
<div>
    { messages }
</div>
  )
}

export default ChatContainer;