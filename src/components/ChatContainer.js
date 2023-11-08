import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { noelLogos } from '@/utils/noelLogos';
const moment = require('moment');
require('moment/locale/fr');


////////////////////////////////////////////////////////////////////////////////

const ChatContainer = (props) => {

  const messages = props.messages.map((data, index) => (
    <div>
    <p className={styles.chatContent}>De <span className={styles.chatName}>{data.sender}</span>  :
        <span className={styles.chatText}> {data.text} </span>
        {/* <span className={styles.firstChatDate}>({firstMessageDate.format("ddd DD/MM/YYYY à HH[h]mm")})</span> */}
        </p>

    </div>  ))

  return (
    <div id="chat" className={styles.chatContainer}>
      <h1>Le chat de noël</h1>
      {messages}
      <FontAwesomeIcon
        className={styles.giftChatIconBottom}
        icon={faCommentDots}
    // onClick={handleCartPlusClick} 
    />
    </div>
      )
}

export default ChatContainer;