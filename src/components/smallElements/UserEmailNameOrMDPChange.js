import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '@/reducers/user';

const UserEmailNameOrMDPChange = (props) => {
    const [userEmailInput, setUserEmailInput] = useState("");
    const [userPseudoInput, setUserPseudoInput] = useState("");
    const [isChecked, setIsChecked] = useState(0);
    const [userPasswordInput, setUserPasswordInput] = useState("");
    const [userRepeatPasswordInput, setUserRepeatPasswordInput] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [pseudoValid, setPseudoValid] = useState(true);
    const [pseudoError, setPseudoError] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(true);
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setUserEmailInput(user.email);
        setUserPseudoInput(user.name);
        setIsChecked(user.enfant === 1);
    }, [user.email, user.name, user.enfant]);

    const dispatch = useDispatch();

    
    const {
        closeSection,
        type,
        updateName,
    } = props;


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        const errorMessage = isValid ? "" : "Adresse e-mail invalide";
        return { isValid, errorMessage };
    };
    
    const validatePseudo = (pseudo) => {
        const pseudoRegex = /^[a-zA-Z0-9\s]{3,}$/;
        const isValid = pseudoRegex.test(pseudo);
        const errorMessage = isValid ? "" : "Le pseudo doit contenir au moins 3 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des espaces et des chiffres.";
        return { isValid, errorMessage };
    };
    
    const validatePassword = (password) => {
        const minLength = 6;
        const isValid = password.length >= minLength;
        const errorMessage = isValid ? "" : `Le mot de passe doit avoir au moins ${minLength} caractères.`;
        return { isValid, errorMessage };
    };
    
    const validateRepeatPassword = (password, repeatPassword) => {
        const isValid = password === repeatPassword;
        const errorMessage = isValid ? "" : "Les mots de passe ne correspondent pas";
        return { isValid, errorMessage };
    };

    const validateForm = () => {
        let isFormValid = true;
    
        if (type === "email") {
            const { isValid: isEmailValid, errorMessage: emailError } = validateEmail(userEmailInput);
            setEmailError(emailError);
            isFormValid = isFormValid && isEmailValid;
        }
    
        if (type === "name") {
            const { isValid: isPseudoValid, errorMessage: pseudoError } = validatePseudo(userPseudoInput);
            setPseudoError(pseudoError);
            isFormValid = isFormValid && isPseudoValid;
        }
    
        if (type === "password") {
            const { isValid: isPasswordValid, errorMessage: passwordError } = validatePassword(userPasswordInput);
            const { isValid: isRepeatPasswordValid, errorMessage: repeatPasswordError } = validateRepeatPassword(userPasswordInput, userRepeatPasswordInput);
    
            setPasswordError(passwordError);
            setRepeatPasswordError(repeatPasswordError);
    
            isFormValid = isFormValid && isPasswordValid && isRepeatPasswordValid;
        }
    
        return isFormValid;
    };

    const handleSaveData = async () => {
        // Appel de la fonction de validation globale
        const isFormValid = validateForm();

        if (isFormValid) {
            const dataToSave = {
                id: user.id,
                email: userEmailInput,
                login: userPseudoInput,
                enfant: isChecked,
                mdp: userPasswordInput,
            };

    
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
                {props.updateChatName && props.updateChatName(user.name, userPseudoInput);}
    
                dispatch(updateUserData({
                    name: userPseudoInput,
                    email: userEmailInput,
                    enfant: isChecked,
                }));                 
                setSuccessModalVisible(true);
               
            } catch (error) {
                console.error("Erreur maj statut cadeau", error);
            }
        }
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.changeUserDataContainer}>


            {type === "email" && (
                <div className={styles.changeUserData}>
                    <h2>Entre ton nouvel email !</h2>
                    {user.email && (
                        <>
                            <input
                                className={`${styles.changeUserDataInput} ${!emailValid ? styles.invalidInput : ""}`}
                                type="text"
                                name="email"
                                onChange={(e) => setUserEmailInput(e.target.value)}
                                value={userEmailInput || ''}
                            />
                            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
                    </>
                    )}
                </div>
            )}

            {type === "name" && (
                <div className={styles.changeUserData}>
                    <h2>Entre ton nouveau pseudo !</h2>
                        <input
                            className={`${styles.changeUserDataInput} ${!pseudoValid ? styles.invalidInput : ""}`}
                            type="text"
                            name="pseudo"
                            onChange={(e) => setUserPseudoInput(e.target.value)}
                            value={userPseudoInput || ''}
                        />
                        {pseudoError && <p className={styles.errorMessage}>{pseudoError}</p>}

                    <div className={styles.toggleSwitchContainer}>
                        <Switch
                            checked={isChecked}
                            onChange={handleToggle}
                            style={{ color: "#f5363f" }}
                        />
                        <span style={{ fontSize: "25px" }}>{isChecked ? 'Enfant' : 'Adulte'}</span>
                    </div>
                </div>
            )}

            {type === "password" && (
                <div className={styles.changeUserData}>
                    <h2>Entre ton nouveau mot de passe !</h2>
                        <input
                            className={`${styles.changeUserDataInput} ${!passwordValid ? styles.invalidInput : ""}`}
                            type="password"
                            name="password"
                            onChange={(e) => setUserPasswordInput(e.target.value)}
                            value={userPasswordInput}
                        />
                        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                        <input
                            className={`${styles.changeUserDataInput} ${!repeatPasswordValid ? styles.invalidInput : ""}`}
                            type="password"
                            name="repeatpassword"
                            onChange={(e) => setUserRepeatPasswordInput(e.target.value)}
                            value={userRepeatPasswordInput}
                        />
                        {repeatPasswordError &&<p className={styles.errorMessage}>{repeatPasswordError}</p>}
                </div>
            )}

            <div className={styles.userDataSaveLogosContainer}>
                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeSection()}

                />
                <FontAwesomeIcon
                    className={styles.saveUserDataIcon}
                    icon={faFloppyDisk}
                    onClick={handleSaveData}
                />
            </div>

            
        {successModalVisible && 
            <div className={styles.successModal}>
            <p>Tes données ont été enregistrées avec succès !</p>
            {type === "name" && <p>Attention, si tu souhaite changer à nouveau ton login, tu dois te reconnecter avec ton nouveau nom</p>}
            <button className={styles.userDataBtn} onClick={() => {setSuccessModalVisible(false), closeSection()}}>Fermer</button>
        </div>
            }
        </div>
    );
};

export default UserEmailNameOrMDPChange;

