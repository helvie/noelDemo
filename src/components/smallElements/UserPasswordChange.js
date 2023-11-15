import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


////////////////////////////////////////////////////////////////////////////////

const UserPasswordChange = (props) => {

    const [userPasswordInput, setUserPasswordInput] = useState("")
    const [userRepeatPasswordInput, setUserRepeatPasswordInput] = useState("")

    const user = useSelector((state) => state.user);

    const {
        closePasswordSection
    } = props;


    const handleSaveData = async () => {
        const dataToSave = {
            id:user.id,
            password: userPasswordInput
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
            <h2>Entre ton nouveau mot de passe !</h2>
            <input
                className={styles.changeUserDataInput}
                type="password"                
                name="password"
                onChange={(e) => setUserPasswordInput(e.target.value)}
                value={userPasswordInput}
            />
            <input
                className={styles.changeUserDataInput}
                type="password"
                name="repeatpassword"
                onChange={(e) => setUserRepeatPasswordInput(e.target.value)}
                value={userRepeatPasswordInput}
            />

            <div className={styles.userDataSaveLogosContainer}>


                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closePasswordSection()}
                />

                <FontAwesomeIcon
                    className={styles.saveUserDataIcon}
                    icon={faFloppyDisk}
                    onClick={() => handleSaveData()}
                />

            </div>


        </div>

    )
}

export default UserPasswordChange;