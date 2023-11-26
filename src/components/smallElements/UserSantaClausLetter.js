import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { updateUserData } from '@/reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_URL } from '@/utils/urls';



////////////////////////////////////////////////////////////////////////////////

const UserSantaClausLetter = (props) => {
    
    const [userLetterInput, setUserLetterInput] = useState("")
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();


    const {
        closeLetterSection
    } = props;

    console.log(user)


    useEffect(() => {
        setUserLetterInput(user.intro)
    }, [user.intro])


    const handleSaveData = async () => {
        const dataToSave = {
            id:user.id,
            lettre: userLetterInput
        }


        // try {

        //     const response = await fetch(`${BACKEND_URL}/api/updateLettrePereNoel`, {
        //         method: 'POST',
        //         headers: {
        //             "Noel-Token": user.token,
        //             "User-Name": encodeURIComponent(user.name),
        //             "App-Name": "NoelTan",
        //             "content-type": 'application/json'
        //         },
        //         body: JSON.stringify(dataToSave)
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        //     }

        //     const data = await response.text();
        //     console.log("Réussi", data);
            dispatch(updateUserData({
                intro: userLetterInput
            }));                 
            setSuccessModalVisible(true);

        //     return data;
        // } catch (error) {
        //     console.error("Erreur maj statut cadeau", error);
        //     throw error;

        // };

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
                    onClick={()=>handleSaveData()}
                />

            </div>

            {successModalVisible && 
            <div className={styles.successModal}>
            <p>Ta lettre a été enregistrée avec succès !</p>
            <button 
            className={styles.userDataBtn} 
            onClick={() => {setSuccessModalVisible(false), closeLetterSection()}}>Fermer</button>
        </div>
            }


        </div>

    )
}

export default UserSantaClausLetter;