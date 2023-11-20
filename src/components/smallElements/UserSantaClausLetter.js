import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



////////////////////////////////////////////////////////////////////////////////

const UserSantaClausLetter = (props) => {
    
    const [userLetterInput, setUserLetterInput] = useState("")
    // const [userInitialEmailInput, setInitialUserEmailInput] = useState("")

    const user = useSelector((state) => state.user);

    const {
        closeLetterSection
    } = props;


    useEffect(() => {
        setUserLetterInput(user.intro)
    }, [user.intro])


    const handleSaveData = async () => {
        const dataToSave = {
            id:user.id,
            lettre: userLetterInput
        }

        closeLetterSection();

        try {

            const response = await fetch("https://noel.helvie.fr/api/updateLettrePereNoel", {
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

        <div className={styles.changeUserDataContainer}>
            <h2>Alors, qu&apos;as-tu à dire au Père-Noël ?</h2>
                <textarea
                    className={styles.changeUserDataTextarea}
                    type="text"
                    name="intro"
                    onChange={(e) => setUserLetterInput(e.target.value)}
                    value={userLetterInput || ''}                    
                    rows={4}
                />
            

            <div className={styles.userDataSaveLogosContainer}>


                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeLetterSection()}
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

export default UserSantaClausLetter;