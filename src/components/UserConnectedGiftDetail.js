import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faGift, faRotateLeft, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

function UserConnectedGiftDetail(props) {
    const {
        data,
        resetGift,
        editingGiftToFalse,
        onInputChange,
        index,
        editingGift,
        onClickInput,
        inputDisabled,
        openModalInHome,
        handleOfferedClick,
        idListe,
        giftUp,
        giftDown,
        position
    } = props;

    const [titleInput, setTitleInput] = useState(data.title);
    const [detailInput, setDetailInput] = useState(data.detail);
    const [urlInput, setUrlInput] = useState(data.url);



    const resetInputs = () => {
        if (
            titleInput !== data.title ||
            detailInput !== data.detail ||
            urlInput !== data.url
        ) {
            // Réinitialisez les champs d'entrée avec les données d'origine
            setTitleInput(data.title);
            setDetailInput(data.detail);
            setUrlInput(data.url);
        }
        editingGiftToFalse()
    }

    const returnChanges = () => {
        resetInputs();
    }

    useEffect(() => {
        if (resetGift) {
            resetInputs()
        }
    }, [resetGift])

    // Fonction gérant la modification des entrées
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Mise à jour de l'état en fonction de l'entrée modifiée
        if (name === 'title') {
            setTitleInput(value);
        } else if (name === 'text') {
            setDetailInput(value);
        } else if (name === 'url') {
            setUrlInput(value);
        }

        // Appel de la fonction de rappel pour informer le parent des modifications
        onInputChange({
            titleInput: name === 'title' ? value : titleInput,
            detailInput: name === 'text' ? value : detailInput,
            urlInput: name === 'url' ? value : urlInput,
            giftKey: props.index,
            idListe: props.idListe
        });
    };

    return (
        <div className={styles.gift}>
            <div className={editingGift || index === 999999 ? styles.editingGiftDetailToUpdate : styles.giftDetailToUpdate}>
                <input
                    className={styles.giftTitleInput}
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={titleInput}
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                />
                <textarea
                    className={styles.giftTextInput}
                    onChange={handleInputChange}
                    value={detailInput}
                    name="text"
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                />
                <input
                    className={styles.giftUrlInput}
                    type="text"
                    name="url"
                    onChange={handleInputChange}
                    value={urlInput}
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                />
                <div className={styles.giftLinkUserConnected}>
                    <FontAwesomeIcon
                        className={`${styles.saveIcon} ${styles.giftIcon}`}
                        style={editingGift ? null : { display: "none" }}
                        icon={faFloppyDisk}
                        onClick={openModalInHome}
                    />
                    <FontAwesomeIcon
                        className={`${styles.returnIcon} ${styles.giftIcon}`}
                        style={editingGift ? null : { display: "none" }}
                        icon={faRotateLeft}
                        onClick={returnChanges}

                    />
                    <FontAwesomeIcon
                        className={`${styles.givedIcon} ${styles.giftIcon}`}
                        icon={faGift}
                        onClick={() => handleOfferedClick(index, idListe, data.offered)}
                    />

                    {/* <div className={styles.giftInputIconsContainer}> */}
                    {position !=="premier" && <FontAwesomeIcon
                        className={`${styles.arrowIcon} ${styles.giftIcon}`}
                        icon={faCircleChevronUp}
                        onClick={()=>giftUp(data.id)}
                    />}
                    {position !=="dernier" && <FontAwesomeIcon
                        className={`${styles.arrowIcon} ${styles.giftIcon}`}
                        icon={faCircleChevronDown}
                        onClick={()=>giftDown(data.id)}
                        
                    />}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default UserConnectedGiftDetail;