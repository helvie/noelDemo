import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFloppyDisk, faGift, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

//______________________________________________________________________________


function UserConnectedGiftDetail(props) {

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        onInputChange,
        index,
        editingGift,
        onClickInput,
        resetGift,
        inputDisabled,
        saveChanges
    }
        = props;

//______________________________________________________________________________

    const title = data ? data.title : "";
    const text = data ? data.detail : "";
    const url = data ? data.url : "";


    //....Etat de l'input titre du cadeau, modifié au fur et à mesure de la saisie
    const [titleInput, setTitleInput] = useState(title);

    //....Etat de l'input texte du cadeau, modifié au fur et à mesure de la saisie
    const [textInput, setTextInput] = useState(text);

    //....Etat de l'input url du cadeau, modifié au fur et à mesure de la saisie
    const [urlInput, setUrlInput] = useState(url);


    // Fonction de réinitialisation des inputs avec les données initiales
    const resetInputs = () => {
        setTitleInput(data.title);
        setTextInput(data.detail);
        setUrlInput(data.url);
    };

//______________________________________________________________________________


    //....Vérification du statut de reset à chaque initialisation ou Màj du composant
    useEffect(() => {
        //....et mise à jour des inputs, le cas échéant
        if (resetGift) {
            resetInputs();
        }
    }, [resetGift]);


//______________________________________________________________________________


    //....Fonction gérant la modification des inputs
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

        //....Appel de la fonction de rappel pour informer le parent des modifications
        //....permettra par la suite d'enregistrer les données dans le parent
        // Mise à jour de modifiedData en temps réel
        onInputChange({
            titleInput: name === 'title' ? value : titleInput,
            textInput: name === 'text' ? value : textInput,
            urlInput: name === 'url' ? value : urlInput,
            index,
        });

    };

//______________________________________________________________________________

    return (
        <>
            <div className={styles.gift}>

                <div className={editingGift ? styles.editingGiftDetailToUpdate : styles.giftDetailToUpdate}>
                    <div className={styles.giftTitleAndLink}>
                        
                        <input
                            className={styles.titleInput}
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            value={titleInput}
                            disabled={inputDisabled}
                            onClick={() => onClickInput(index)}
                        />

                        <div className={styles.giftLink}>

                            <FontAwesomeIcon
                                className={`${styles.saveIcon} ${styles.giftIcon}`}
                                style={editingGift ? null : { display: "none" }}
                                icon={faFloppyDisk}
                                onClick={saveChanges}

                            />

                            <FontAwesomeIcon
                                className={`${styles.returnIcon} ${styles.giftIcon}`}
                                style={editingGift ? null : { display: "none" }}
                                icon={faRotateLeft}
                            />

                            <FontAwesomeIcon
                                className={`${styles.givedIcon} ${styles.giftIcon}`}
                                icon={faGift}
                            />

                        </div>
                    </div>

                    <div className={styles.textAreaContainer}>

                        <textarea
                            className={styles.textInput}
                            onChange={handleInputChange}
                            value={textInput}
                            name="text"
                            disabled={inputDisabled}
                            onClick={() => onClickInput(index)}/>

                    </div>

                    <div>

                        <input
                            className={styles.urlInput}
                            type="text"
                            name="url"
                            onChange={handleInputChange}
                            value={urlInput}
                            disabled={inputDisabled}
                            onClick={() => onClickInput(index)}
                        />
                        
                    </div>

                </div>

            </div>
        </>
    );
}

export default UserConnectedGiftDetail;