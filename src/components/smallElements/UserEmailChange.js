import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



////////////////////////////////////////////////////////////////////////////////

const UserEmailChange = (props) => {

    const [userEmailInput, setUserEmailInput] = useState("")
    // const [userInitialEmailInput, setInitialUserEmailInput] = useState("")

    const user = useSelector((state) => state.user);

    const {
        closeEmailSection
    } = props;

    useEffect(() => {
        setUserEmailInput(user.email)
        // setInitialUserEmailInput(user.email)
    }, [user.email])


    const handleSaveData = async () => {
        const dataToSave = {
            id:user.id,
            email: userEmailInput,
            login: user.name,
            enfant: user.enfant
        }

        closeEmailSection();

        try {

            const response = await fetch("https://noel.helvie.fr/api/updateUtilisateur", {
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
            <h2>Entre ton nouvel email !</h2>
            {user.email &&
                <input
                    className={styles.changeUserDataInput}
                    type="text"
                    name="email"
                    onChange={(e) => setUserEmailInput(e.target.value)}
                    value={userEmailInput || ''}
                />
            }


            <div className={styles.userDataSaveLogosContainer}>


                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeEmailSection()}
                />

                <FontAwesomeIcon
                    className={styles.saveUserDataIcon}
                    icon={faFloppyDisk}
                    onClick={handleSaveData}
                />

            </div>


        </div>

    )
}

export default UserEmailChange;