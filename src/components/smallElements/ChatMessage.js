import styles from '../../styles/Home.module.css';
import { faCommentDots, faEye, faPaperPlane, faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


////////////////////////////////////////////////////////////////////////////////

const ChatMessage = (props) => {
    

    const {
        tchatOpen,
        tchatInput,
        changeTchatInput,
        thisIsTop,
        setTchatOpen,
        saveMessage
    }
    = props;


    return (

        <>
        {tchatOpen &&
            <textarea
                className={styles.chatInput}
                type="text"
                name="title"
                onChange={(e) => changeTchatInput(e.target.value)}
                value={tchatInput}
                rows={2}
            />
        }

        <div className={styles.chatLogoContainer}>
        {thisIsTop &&

            <a href="#chat" className={styles.giftChatIconLink}>
                <FontAwesomeIcon
                    className={styles.giftChatIcon}
                    icon={faEye}
                />
            </a>
}
            {!tchatOpen && <FontAwesomeIcon
                className={styles.giftChatIcon}
                icon={faCommentDots}
                onClick={() => setTchatOpen(true)}
            />}

            {tchatOpen &&
                <>
                    <FontAwesomeIcon
                        className={styles.giftChatIcon}
                        icon={faCommentSlash}
                        onClick={() => setTchatOpen(false)}
                        />
                    <FontAwesomeIcon
                        className={styles.giftChatIcon}
                        icon={faPaperPlane}
                        onClick={() => saveMessage()}
                    />
                </>
                }
        </div>


</>

    )
}

export default ChatMessage;