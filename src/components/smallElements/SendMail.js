import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_URL } from '@/utils/urls';

const SendMail = (props) => {
    const [mailMessageInput, setMailMessageInput] = useState("");
    const [sendMailOk, setSendMailOk] = useState(false);
    const [messageError, setMessageError] = useState("");

    const user = useSelector((state) => state.user);

    const convertTextToHTML = (text) => {
        // Convertir les retours à la ligne en balises <p>
        const paragraphs = text.split('\n').map((paragraph, index) => (
            `<p style='font-size:18px;color:darkred' key=${index}>${paragraph}</p>`
        ));
        return paragraphs.join('');
    };
    const {
        name,
        mailRecipient,
        closeMailSend,
    } = props;

    const mailRoute = mailRecipient === "santaClaus" ?
        "envoiMessagePereNoel" :
        "envoiMessageCible";

    const messageContent = mailRecipient === "santaClaus" ?
        `<p style='font-size:18px;'>Bonjour père-noël de ${name} !</p><p style='font-size:18px;'>Quelqu'un voudrait te poser une question... La voici :</p><p style='font-size:18px;color:darkred'>{message} </p><p style='font-size:18px;'><a href='https://noel-guillemot.vercel.app/mailResponse/{msgId}'>Clique ici pour répondre !</a></p>` :
        `<p style='font-size:18px;'>Bonjour ${name}, </p><p style='font-size:18px;'>Voici un message qui t'est destiné : </p style='font-size:18px;color:darkred'>{message}</p><p style='font-size:18px;'><a href='https://noel-guillemot.vercel.app/mailResponse/{msgId}'>Clique ici pour répondre !</a></p>`;

    const messageObject = mailRecipient === "santaClaus" ?
        "Coucou père Noël, quelqu'un voudrait te poser une question :" :
        `Bonjour ${name}, quelqu'un voudrait te poser une question :`;

    const handleSaveData = async () => {

        if (mailMessageInput.trim() === "") {
            // Affiche un message d'erreur ou gère le cas où l'input est vide
            setMessageError("L'input ne peut pas être vide !");
            return;
        }

        const htmlMessage = convertTextToHTML(mailMessageInput);
        
        const dataToSave = {
            idExpediteur: user.id,
            loginCible: name,
            message: htmlMessage,
            objet: messageObject,
            corps: messageContent,
        };

        // try {
        //     const response = await fetch(`${BACKEND_URL}/api/${mailRoute}`, {
        //         method: 'POST',
        //         headers: {
        //             "Noel-Token": user.token,
        //             "User-Name": encodeURIComponent(user.name),
        //             "App-Name": "NoelTan",
        //             "content-type": 'application/json',
        //         },
        //         body: JSON.stringify(dataToSave),
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        //     }

        //     const data = await response.text();
            setSendMailOk(true);
            setMailMessageInput("");
        //     console.log("Réussi", data);
        //     return data;
        // } catch (error) {
        //     console.error("Erreur maj user", error);
        //     throw error;
        // }
    };

    return (
        <div className={styles.writeMailSection}>
            {mailRecipient === "person" ? (
                <h2>Envoie ton message à {name} </h2>
            ) : mailRecipient === "santaClaus" ? (
                <h2>Envoie ton message au père-noël de {name}</h2>
            ) : null}

            <textarea
                className={styles.sendMailTextarea}
                type="text"
                name="mailMessage"
                onChange={(e) => {
                    setMailMessageInput(e.target.value);
                    setMessageError("");
                    setSendMailOk(false);
                }}
                value={mailMessageInput || ''}
                rows={4}
            />

            <div className={styles.userDataSaveLogosContainer}>
                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={closeMailSend}
                />
                <FontAwesomeIcon
                    className={styles.saveUserDataIcon}
                    icon={faPaperPlane}
                    onClick={handleSaveData}
                />
            </div>
            {messageError && <p className={styles.sendMailOk}>{messageError}</p>}
            {sendMailOk && <p className={styles.sendMailOk}>Ton message a bien été envoyé !</p>}
        </div>
    );
};

export default SendMail;