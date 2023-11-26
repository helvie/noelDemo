import styles from '../styles/Home.module.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faHome } from '@fortawesome/free-solid-svg-icons';
import TokenForUserService from '../services/TokenForUserService';
import UserInfosService from '../services/UserInfosService';
import { login } from '@/reducers/user';
import { updateUserData } from '@/reducers/user';
import ConnectionUser from './ConnectionUser';
import { useRouter } from 'next/router';
import { BACKEND_URL } from '@/utils/urls';

const MailResponse = (props) => {

    const [responseInput, setResponseInput] = useState("");
    const [signinName, setSigninName] = useState("");
    const [errorLoginPass, setErrorLoginPass] = useState(false);
    const user = useSelector((state) => state.user);
    const [message, setMessage] = useState("");
    const [sendOk, setSendOk] = useState(false);

    const token = user.token;
    const name = user.name;
    const router = useRouter();


    const dispatch = useDispatch();


    const idmessage = props.mailNumber;

    const convertHTMLToText = (html) => {
        // Créer un div temporaire pour parser le HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
    
        // Récupérer le contenu textuel de chaque paragraphe
        const paragraphs = Array.from(tempDiv.querySelectorAll('p')).map((paragraph) => (
            paragraph.textContent || paragraph.innerText
        ));
    
        // Joindre les paragraphes en un seul texte avec des retours à la ligne
        return paragraphs.join('\n\n');
    };
    
    

    const handleUserLogin = async (logs) => {
        try {
            const tokenService = TokenForUserService();
            const tokenResponse = await tokenService.getTokenForUser(logs, setErrorLoginPass);

            if (tokenResponse.success) {
                setErrorLoginPass(false);
                const { token, name } = tokenResponse;
                dispatch(login({
                    token: token,
                    name: name
                }));
                setSigninName(name);

                const userInfoService = UserInfosService();
                const userInfoResponse = await userInfoService.getUserInfos(name, token);

                if (userInfoResponse.success) {
                    const userData = userInfoResponse.userData;
                    dispatch(updateUserData({
                        id: userData.id,
                        name: userData.login,
                        cible: userData.cible,
                        email: userData.email,
                        enfant: userData.enfant,
                        intro: userData.intro
                    }));

                    fetchData(idmessage, token, name);
                } else {
                    console.log("Erreur lors de la récupération des informations utilisateur");
                }
            } else {
                setErrorLoginPass(true);
                console.log("Erreur lors de la récupération du token");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la connexion : ", error);
        }
    };

    const saveMessage = async () => {
        try {


            const response = await fetch(`${BACKEND_URL}/api/envoiReponseMessage`, {
                method: 'POST',

                headers: {
                    "user-name": encodeURIComponent(name),
                    "app-name": "NoelTan",
                    "noel-token": token,
                    "content-type": 'application/json'

                },
                body: JSON.stringify({
                    "idMessageOrigine": idmessage,
                    "reponseUtilisateur": responseInput,
                    "objet": "Voici la réponse à ton message !",
                    "corps": ""
                })
            });

            if (response.status === 200) {
                const data = await response.json();
                setSendOk(true)
                setMessage("")

            } else {
                throw new Error("Failed to get user data. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'envoi du message : ", error);
        }
    };

    const fetchData = async (idmessage, token, name) => {
        // try {
        //     const response = await fetch(`${BACKEND_URL}/api/getmessage.php?idmessage=${idmessage}`, {
        //         headers: {
        //             "user-name": encodeURIComponent(name),
        //             "app-name": "NoelTan",
        //             "noel-token": token
        //         }
        //     });

        //     if (response.status === 200) {
        //         const receveidMessage = await response.json();
                const htmlMessage = convertHTMLToText(receveidMessage.message)
                setMessage(htmlMessage)
        //     } else {
        //         throw new Error("Failed to get user data. Status: " + response.status);
        //     }
        // } catch (error) {
        //     console.error("Une erreur s'est produite lors de la récupération des informations utilisateur : ", error);
        // }
    };



    return (
        <div className={styles.mailResponseContainer}>
            {name ? (
                <>
                    <div className={styles.mailResponseContent}>
                        {message && (
                            <>
                                <h2>Voici le message que tu as reçu :</h2>
                                <div className={styles.receveidMessage} dangerouslySetInnerHTML={{ __html: message }}></div>
                                <h2 className={styles.mailResponseTitle}>Tu peux répondre ci-dessous :</h2>

                                <textarea
                                    className={styles.mailResponseInput}
                                    type="text"
                                    name="title"
                                    onChange={(e) => setResponseInput(e.target.value)}
                                    value={responseInput}
                                    rows={2}
                                />
                                <div>

                                    <FontAwesomeIcon
                                        className={styles.giftMessageResponseIcon}
                                        icon={faHome}
                                        onClick={() => router.push('/')}
                                        />

                                    <FontAwesomeIcon
                                        className={styles.giftMessageResponseIcon}
                                        icon={faPaperPlane}
                                        onClick={() => saveMessage()}
                                    />
                                </div>
                            </>
                        )}
                        {!message && sendOk === false &&
                            <div className={styles.infoLostRoute}>
                                <p>Tu t&apos;es perdu ? Demande ton chemin à l&apos;accueil !</p>
                                <FontAwesomeIcon
                                    className={styles.giftMessageResponseIcon}
                                    icon={faHome}
                                    onClick={() => router.push('/')}
                                />
                                {/* <div style={{cursor:"pointer"}} onClick={()=>router.push('/')} className={stylesHeader.headerLogo}></div> */}
                            </div>}
                            {!message && sendOk === true &&
                            <div className={styles.infoLostRoute}>
                                <p>Ton message a bien été envoyé !</p>
                                <FontAwesomeIcon
                                    className={styles.giftMessageResponseIcon}
                                    icon={faHome}
                                    onClick={() => router.push('/')}
                                />
                                {/* <div style={{cursor:"pointer"}} onClick={()=>router.push('/')} className={stylesHeader.headerLogo}></div> */}
                            </div>}
                    </div>
                </>
            ) : (
                <ConnectionUser onValidation={handleUserLogin} errorLoginPass={errorLoginPass} />
            )}
        </div>
    );
}
export default MailResponse;