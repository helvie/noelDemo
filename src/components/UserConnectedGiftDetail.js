import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFloppyDisk, faGift, faRotateLeft, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

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
        position,
        setEditingGift,
        editingMoveGift
    } = props;

    // console.log(data.id===editingMoveGift)
    // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")


    const [titleInput, setTitleInput] = useState(data.title);
    const [detailInput, setDetailInput] = useState(data.detail);
    const [urlInput, setUrlInput] = useState(data.url);
    const [titleError, setTitleError] = useState("");
    const [urlError, setUrlError] = useState("");

    const changeEditingGift = () => {

        { editingGift === data.id || editingGift === -1 ? setEditingGift(data.id) : openModal() }

    }

    // if(data.id===3745){
    //     console.log("essai")
    // }

    const rewinGift = () => {
        giftUp(data.id)
        console.log(data.id)
    }

    const comeDownGift = () => {
        giftDown(data.id)
        // console.log(data.id===editingMoveGift)

    }

    const openModal = () => {
        const isValid = validateInputs();

        if (isValid) {
            openModalInHome();
        }
    }

    const validateInputs = () => {
        // Effectuez toutes les vérifications nécessaires et mettez à jour les erreurs
        const newTitleError = titleInput.trim() === "" ? "Le titre ne peut pas être vide." : "";
        const newUrlError = urlInput.trim() === "" || /^https?:\/\/\S*$/.test(urlInput) ? "" : "L'URL doit être valide.";

        // Mettez à jour les états d'erreur
        setTitleError(newTitleError);
        setUrlError(newUrlError);

        // Retournez true si toutes les validations réussissent (les erreurs sont vides), sinon false
        return !newTitleError && !newUrlError;
    }

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
        editingGiftToFalse();
    }

    const returnChanges = () => {
        setUrlError("");
        setTitleError("");
        resetInputs();
    }

    useEffect(() => {
        if (resetGift) {
            resetInputs();
        }
    }, [resetGift]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            setTitleInput(value);
        } else if (name === 'text') {
            setDetailInput(value);
        } else if (name === 'url') {
            setUrlInput(value);
        }

        onInputChange({
            titleInput: name === 'title' ? value : titleInput,
            detailInput: name === 'text' ? value : detailInput,
            urlInput: name === 'url' ? value : urlInput,
            giftKey: props.index,
            idListe: props.idListe,
            ordre: data.Ordre
        });
    };

    return (
        <div className={styles.gift}>
            <div className={editingGift === data.id || index === 999999 ? styles.editingGiftDetailToUpdate : styles.giftDetailToUpdate}>
                <input
                    className={styles.giftTitleInput}
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={titleInput}
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                    placeholder="Titre"

                />
                <textarea
                    className={styles.giftTextInput}
                    onChange={handleInputChange}
                    value={detailInput}
                    name="text"
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                    placeholder="Texte (facultatif)"
                />
                <input
                    className={styles.giftUrlInput}
                    type="text"
                    name="url"
                    onChange={handleInputChange}
                    value={urlInput}
                    disabled={inputDisabled}
                    onClick={() => onClickInput(index)}
                    placeholder="Url (facultatif)"
                />

                {titleError && <p className={styles.errorMessage}>{titleError}</p>}
                {urlError && <p className={styles.errorMessage}>{urlError}</p>}

                <div className={styles.giftLinkUserConnected}>

                    <FontAwesomeIcon
                        className={`${styles.saveIcon} ${styles.giftIcon}`}
                        style={editingGift !== data.id ? null : { display: "none" }}
                        icon={faEdit}
                        onClick={() => changeEditingGift()}
                    />
                    <FontAwesomeIcon
                        className={`${styles.saveIcon} ${styles.giftIcon}`}
                        style={editingGift === data.id ? null : { display: "none" }}
                        icon={faFloppyDisk}
                        onClick={openModal}
                    />
                    <FontAwesomeIcon
                        className={`${styles.returnIcon} ${styles.giftIcon}`}
                        style={editingGift === data.id ? null : { display: "none" }}
                        icon={faRotateLeft}
                        onClick={returnChanges}
                    />
                    <FontAwesomeIcon
                        className={`${styles.givedIcon} ${styles.giftIcon}`}
                        icon={faGift}
                        onClick={() => handleOfferedClick(index, idListe, data.offered)}
                    />

                    {position !== "premier" && <FontAwesomeIcon
                        className={`${styles.arrowIcon} ${styles.giftIcon}`}
                        icon={faCircleChevronUp}
                        onClick={() => rewinGift(data.id)}
                        disabled={editingMoveGift === data.id}
                        style={editingMoveGift === data.id ? { color: "red" } : null}
                    />}
                    {position !== "dernier" && (
                        <FontAwesomeIcon
                            className={`${styles.arrowIcon} ${styles.giftIcon}`}
                            icon={faCircleChevronDown}
                            onClick={() => !editingMoveGift && comeDownGift(data.id)}
                            style={editingMoveGift === data.id ? { color: "red" } : null}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserConnectedGiftDetail;

