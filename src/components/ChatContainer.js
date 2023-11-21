import styles from '../styles/Home.module.css';
const moment = require('moment');
require('moment/locale/fr');




////////////////////////////////////////////////////////////////////////////////

const ChatContainer = (props) => {

  const messages = props.messages
  .filter(message => moment().subtract(2, 'years').isBefore(moment.unix(message.date)))  .map((data, index) => (
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