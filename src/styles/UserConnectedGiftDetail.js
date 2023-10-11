import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFloppyDisk, faGift, faEdit, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function UserConnectedGiftDetail(props) {

    const {
        data,
        onInputChange,
        index,
        onClick,
        editingGift,
        updateParent,
        lastEditingGift,
        resetGift,
        inputDisabled
    }
        = props;

    const [titleInput, setTitleInput] = useState(data.title);
    const [textInput, setTextInput] = useState(data.detail);
    const [urlInput, setUrlInput] = useState(data.url);
    // const [isEditing, setIsEditing] = useState(editingGift);


    // Créez une fonction pour réinitialiser les inputs avec les données initiales
    const resetInputs = () => {
        setTitleInput(data.title);
        setTextInput(data.detail);

        setUrlInput(data.url);
        // setIsEditing(false);
    };

    // console.log("editingGift "+editingGift)
    // console.log("resetGift "+resetGift)

    useEffect(() => {
        // Réinitialisez les inputs lorsque editingGift change
        if (resetGift) {
            resetInputs();
        }
    }, [resetGift]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Mettre à jour l'état correspondant à l'input modifié
        if (name === 'title') {
            setTitleInput(value);
        } else if (name === 'text') {
            setTextInput(value);
        } else if (name === 'url') {
            setUrlInput(value);
        }

        // Mettre à jour l'état d'édition
        // setIsEditing(true);

        // Appeler la fonction de rappel pour informer le parent des modifications
        onInputChange({
            // isEditing: true,
            titleInput,
            textInput,
            urlInput,
            index
        });
    };

    return (
        <>
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
                    onClick={updateParent}

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
        </>
    );
}

export default UserConnectedGiftDetail;