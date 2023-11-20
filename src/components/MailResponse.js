import styles from '../styles/Home.module.css';
import React from 'react';
import Header from '../components/smallElements/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faHome } from '@fortawesome/free-solid-svg-icons';
import TokenForUserService from './services/TokenForUserService';
import UserInfosService from './services/UserInfosService';
import { login } from '@/reducers/user';
import { updateUserData } from '@/reducers/user';
import { useEffect } from 'react';
import ConnectionUser from './ConnectionUser';

const MailResponse = (props) => {

    const [responseInput, setResponseInput] = useState("");
    const [signinName, setSigninName] = useState("");
    const [errorLoginPass, setErrorLoginPass] = useState(false);
    const user = useSelector((state) => state.user);


    const dispatch = useDispatch();

    console.log(props.mailNumber)

    const idmessage = props.mailNumber;


    const handleUserLogin = async (logs) => {
        try {
            // Step 1: Get token for user
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

                // Step 2: Get user information
                const userInfoService = UserInfosService();
                const userInfoResponse = await userInfoService.getUserInfos(name, token);

                if (userInfoResponse.success) {
                    const userData = userInfoResponse.userData;
                    console.log(userData)

                    // Dispatch user data update
                    dispatch(updateUserData({
                        id: userData.id,
                        name: userData.login,
                        cible: userData.cible,
                        email: userData.email,
                        enfant: userData.enfant,
                        intro: userData.intro
                    }));

                    // Appel de fetchData ici
                    fetchData(idmessage);
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

    const fetchData = async (idmessage) => {
        try {
            const response = await fetch(`https://noel.helvie.fr/api/getmessage.php?idmessage=${idmessage}`, {
                headers: {
                    "user-name": encodeURIComponent(user.name),
                    "app-name": "NoelTan",
                    "noel-token": user.token
                }
            });

            if (response.status === 200) {
                const chatMessage = await response.json();
                console.log("essai");
                // Faites quelque chose avec chatMessage si nécessaire
            } else {
                throw new Error("Failed to get user data. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des informations utilisateur : ", error);
        }
    };

    console.log("coucou")
    return (
        <>
            {signinName ? (
                <>
                    <textarea
                        className={styles.chatInput}
                        type="text"
                        name="title"
                        onChange={(e) => setResponseInput(e.target.value)}
                        value={responseInput}
                        rows={2}
                    />

                    <FontAwesomeIcon
                        className={styles.giftChatIcon}
                        icon={faHome}
                        onClick={() => setTchatOpen(false)}
                    />

                    <FontAwesomeIcon
                        className={styles.giftChatIcon}
                        icon={faPaperPlane}
                        onClick={() => saveMessage()}
                    />
                </>
            ) : (
                <ConnectionUser onValidation={handleUserLogin} errorLoginPass={errorLoginPass} />
            )}
        </>
    );
}
export default MailResponse;