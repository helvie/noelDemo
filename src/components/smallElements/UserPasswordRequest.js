import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////

const UserPasswordRequest = (props) => {

    const user = useSelector((state) => state.user);

    const {
        closeRequestSection
    } = props;

    const handleSaveData = async () => {
        const dataToSave = {
            login: user.name,
        }

        closePasswordSection();

        try {

            const response = await fetch("https://noel.helvie.fr/api/resetMDP", {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": encodeURIComponent(user.name),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            const data = await response.text();
            console.log("Réussi", data);
            return data;
        } catch (error) {
            console.error("Erreur maj statut cadeau", error);
            throw error;

        };

    }

    return (

        <div className={styles.changeUserData}>
            <h2>Clique la clé pour recevoir un nouveau mot de passe !</h2>


            <div className={styles.userDataSaveLogosContainer}>

                <FontAwesomeIcon
                    className={styles.keyIcon}
                    icon={faKey}
                    onClick={() => handleSaveData()}
                />

            </div>

            <div className={styles.userDataSaveLogosContainer}>


                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeRequestSection()}
                />

            </div>

        </div>

    )
}


export default UserPasswordRequest;