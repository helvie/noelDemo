import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFloppyDisk, faGift, faEdit, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function UserConnectedGiftDetail(props) {

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        onInputChange,
        index,
        onClick,
        editingGift,
        // updateParent,
        // lastEditingGift,
        resetGift,
        inputDisabled,
    }
        = props;

    //....Etat de l'input titre du cadeau, modifié au fur et à mesure de la saisie
    const [titleInput, setTitleInput] = useState(data.title);
        
    //....Etat de l'input texte du cadeau, modifié au fur et à mesure de la saisie
    const [textInput, setTextInput] = useState(data.detail);
        
    //....Etat de l'input url du cadeau, modifié au fur et à mesure de la saisie
    const [urlInput, setUrlInput] = useState(data.url);
    
//------------------------------------------------------------------------   
// const [isEditing, setIsEditing] = useState(editingGift);
//------------------------------------------------------------------------


    // Fonction de réinitialisation des inputs avec les données initiales
    const resetInputs = () => {
        setTitleInput(data.title);
        setTextInput(data.detail);
        setUrlInput(data.url);
//------------------------------------------------------------------------
// setIsEditing(false);
//------------------------------------------------------------------------
        
    };

    //....Vérification du statut de reset à chaque initialisation ou Màj du composant
    useEffect(() => {
        //....Et mise à jour des inputs, le cas échéant
        if (resetGift) {
            resetInputs();
        }
    }, [resetGift]);

//....Fonction
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Mise à jour, au fur et à mesure de la saisie, de l'état correspondant à l'input modifié
        if (name === 'title') {
            setTitleInput(value);
        } else if (name === 'text') {
            setTextInput(value);
        } else if (name === 'url') {
            setUrlInput(value);
        }

//------------------------------------------------------------------------
// Mettre à jour l'état d'édition
// setIsEditing(true);
//------------------------------------------------------------------------

        //....Appel de la fonction de rappel pour informer le parent des modifications
        //....permettra par la suite d'enregistrer les données dans le parent
        onInputChange({
            titleInput,
            textInput,
            urlInput,
            index   
                     
//------------------------------------------------------------------------
// isEditing: true,
//------------------------------------------------------------------------

        });
    };

    return (
        <>
            <div className={styles.gift}>

                <div className={editingGift ? styles.editingGiftDetailToUpdate : styles.giftDetailToUpdate}>
                    <div>
                        <input
                            className={styles.titleInput}
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            value={titleInput}
                            disabled={inputDisabled}
                        />
                    </div>
                    <div className={styles.textAreaContainer}>

                        <textarea
                            className={styles.textInput}
                            onChange={handleInputChange}
                            value={textInput}
                            name="text"
                            disabled={inputDisabled}

                        ></textarea>
                    </div>
                    <div>
                        <input
                            className={styles.urlInput}
                            type="text"
                            name="url"
                            onChange={handleInputChange}
                            value={urlInput}
                            disabled={inputDisabled}

                        />
                    </div>

                </div>
                <div className={styles.giftLink}>

                    <FontAwesomeIcon
                        className={styles.saveIcon}
                        icon={faFloppyDisk}
                    >
                    </FontAwesomeIcon>

                    <FontAwesomeIcon
                        className={styles.returnIcon}
                        icon={faRotateLeft}
                    // onClick={updateParent}

                    >
                    </FontAwesomeIcon>

                    <FontAwesomeIcon
                        className={styles.givedIcon}
                        icon={faGift}
                    >
                    </FontAwesomeIcon>

                    <FontAwesomeIcon
                        className={styles.editIcon}
                        icon={faEdit}
                        onClick={onClick}
                    >
                    </FontAwesomeIcon>
                </div>
            </div>
        </>
    );
}

export default UserConnectedGiftDetail;