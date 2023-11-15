import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';


////////////////////////////////////////////////////////////////////////////////

const UserNameChange = (props) => {

    const [userPseudoInput, setUserPseudoInput] = useState("")
    const [isChecked, setIsChecked] = useState(0);

    const user = useSelector((state) => state.user);

    const {
        closeNameSection
    } = props;


    useEffect(() => {
        console.log("user " + user)
        setUserPseudoInput(user.name)
        {user.enfant==1 ? setIsChecked(true) : setIsChecked(false)}
    }, [user.name])



    const handleSaveData = async () => {
        console.log(isChecked)
        const dataToSave = {
            id: user.id,
            email: user.email,
            login: userPseudoInput,
            enfant: isChecked
        }

        closeNameSection();

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
            console.error("Erreur maj user", error);
            throw error;

        };

    }



    const handleToggle = () => {
        setIsChecked(!isChecked);

    };

    return (

        <div className={styles.changeUserData}>
            <h2>Entre ton nouveau pseudo !</h2>


            <input
                className={styles.changeUserDataInput}
                type="text"
                name="pseudo"
                onChange={(e) => setUserPseudoInput(e.target.value)}
                value={userPseudoInput || ''}
            />

            <div className={styles.toggleSwitchContainer}>
                <Switch
                    checked={isChecked}
                    onChange={handleToggle}
                    style={{ color: "#e62530" }}
                />
                <span style={{ fontSize: "25px" }}>{isChecked ? 'Enfant' : 'Adulte'}</span>
            </div>


            <div className={styles.userDataSaveLogosContainer}>

                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeNameSection()}
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

export default UserNameChange;