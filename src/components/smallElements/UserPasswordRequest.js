import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft, faKey, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_URL } from '@/utils/urls';

////////////////////////////////////////////////////////////////////////////////

const UserPasswordRequest = (props) => {

    const [passwordRequestStatus, setPasswordRequestStatus] = useState("noRequested");
    const [signinName, setSigninName] = useState("");

    const handleSaveData = async () => {
        const dataToSave = {
            login: signinName,
        }

        try {

            const response = await fetch(`${BACKEND_URL}/api/resetMDP`, {
                method: 'POST',
                headers: {
                    "User-Name": encodeURIComponent(signinName),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            const data = await response.text();
            setPasswordRequestStatus("connexionSuccess")
            console.log("Réussi", data);

            return data;
        } catch (error) {
            console.error("Erreur maj statut cadeau", error);
            throw error;

        };

    }

    return (
        <div className={styles.passwordRequestContainer}>
          {passwordRequestStatus === "noRequested" ? (
            <>
              <p>Mot de passe oublié ? Clique sur la clé !</p>
              <div className={styles.userDataSaveLogosContainer}>
                <FontAwesomeIcon
                  className={styles.keyIcon}
                  icon={faKey}
                  onClick={() => setPasswordRequestStatus("requested")}
                />
              </div>
            </>
          ) : passwordRequestStatus === "requested" ? (
            <>
              <p>Indique ton login de connexion</p>
              <input
                className={styles.inputNewPassRequest}
                type="text"
                placeholder="nom"
                aria-label="signinName"
                id="signinName"
                onChange={(e) => setSigninName(e.target.value)}
                value={signinName}
              />
              <div className={styles.userDataSaveLogosContainer}>
                <FontAwesomeIcon
                  className={styles.requestPasswordSaveIcon}
                  icon={faSave}
                  onClick={() => handleSaveData()}
                />
                <FontAwesomeIcon
                  className={styles.returnUserDataIcon}
                  icon={faRotateLeft}
                  onClick={() => setPasswordRequestStatus("noRequested")}
                />
              </div>
            </>
          ) : (
            <>
              {passwordRequestStatus && (
                <p className={styles.requestPasswordInformation}>Tu as dû recevoir un mail avec ton nouveau mot de passe ! - N&apos;oublie pas de regarder dans tes spams !</p>
              )}
            </>
          )}
        </div>
      );
}


export default UserPasswordRequest;