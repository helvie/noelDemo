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
        position,
    } = props;

    console.log(data.Ordre)


    const [titleInput, setTitleInput] = useState(data.title);
    const [detailInput, setDetailInput] = useState(data.detail);
    const [urlInput, setUrlInput] = useState(data.url);
    const [titleError, setTitleError] = useState("");
    const [urlError, setUrlError] = useState("");

    const openModal = () => {

        // console.log(urlError)
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
            idListe: props.idListe,
            ordre: data.Ordre
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
                        style={editingGift ? null : { display: "none" }}
                        icon={faFloppyDisk}
                        onClick={openModal}
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
                    {position !== "premier" && <FontAwesomeIcon
                        className={`${styles.arrowIcon} ${styles.giftIcon}`}
                        icon={faCircleChevronUp}
                        onClick={() => giftUp(data.id)}
                    />}
                    {position !== "dernier" && <FontAwesomeIcon
                        className={`${styles.arrowIcon} ${styles.giftIcon}`}
                        icon={faCircleChevronDown}
                        onClick={() => giftDown(data.id)}
                    />}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default UserConnectedGiftDetail;

// import styles from '../styles/Home.module.css';
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFloppyDisk, faGift, faRotateLeft, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

// function UserConnectedGiftDetail(props) {
//     const {
//         data,
//         resetGift,
//         editingGiftToFalse,
//         onInputChange,
//         index,
//         editingGift,
//         onClickInput,
//         inputDisabled,
//         openModalInHome,
//         handleOfferedClick,
//         idListe,
//         giftUp,
//         giftDown,
//         position,
//     } = props;

//     const [titleInput, setTitleInput] = useState(data.title);
//     const [detailInput, setDetailInput] = useState(data.detail);
//     const [urlInput, setUrlInput] = useState(data.url);



//     const openModal = () => {
//         if (!pseudoError && !emailError && !passwordError && !repeatPasswordError) {
//             openModalInHome();
//         }    
//     } 

//     const resetInputs = () => {
//         if (
//             titleInput !== data.title ||
//             detailInput !== data.detail ||
//             urlInput !== data.url
//         ) {
//             // Réinitialisez les champs d'entrée avec les données d'origine
//             setTitleInput(data.title);
//             setDetailInput(data.detail);
//             setUrlInput(data.url);
//         }
//         editingGiftToFalse()
//     }

//     const returnChanges = () => {
//         resetInputs();
//     }

//     useEffect(() => {
//         if (resetGift) {
//             resetInputs()
//         }
//     }, [resetGift])

//     // Fonction gérant la modification des entrées
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         // Mise à jour de l'état en fonction de l'entrée modifiée
//         const handleInputChange = (e) => {
//             const { name, value } = e.target;
    
//             // Mise à jour de l'état en fonction de l'entrée modifiée
//             if (name === 'title') {
//                 setTitleInput(value);
//                 setTitleError(value.trim() === "" ? "Le titre ne peut pas être vide." : "");
//                 // Ajout de la validation regex pour le titre (par exemple, permet seulement les lettres et les espaces)
//                 setTitleError(/^[a-zA-Z\s]+$/.test(value) ? "" : "Le titre ne peut contenir que des lettres et des espaces.");
            
//             } else if (name === 'url') {
//                 setUrlInput(value);
//                 // Ajout de la validation regex pour l'URL (par exemple, permet une URL valide)
//                 setUrlError(/^https?:\/\/\S+$/.test(value) ? "" : "L'URL doit être valide.");
//             }

//         // Appel de la fonction de rappel pour informer le parent des modifications
//         onInputChange({
//             titleInput: name === 'title' ? value : titleInput,
//             detailInput: name === 'text' ? value : detailInput,
//             urlInput: name === 'url' ? value : urlInput,
//             giftKey: props.index,
//             idListe: props.idListe
//         });
//     };

//     return (
//         <div className={styles.gift}>
//             <div className={editingGift || index === 999999 ? styles.editingGiftDetailToUpdate : styles.giftDetailToUpdate}>
//                 <input
//                     className={styles.giftTitleInput}
//                     type="text"
//                     name="title"
//                     onChange={handleInputChange}
//                     value={titleInput}
//                     disabled={inputDisabled}
//                     onClick={() => onClickInput(index)}
//                 />
//                 <textarea
//                     className={styles.giftTextInput}
//                     onChange={handleInputChange}
//                     value={detailInput}
//                     name="text"
//                     disabled={inputDisabled}
//                     onClick={() => onClickInput(index)}
//                 />
//                 <input
//                     className={styles.giftUrlInput}
//                     type="text"
//                     name="url"
//                     onChange={handleInputChange}
//                     value={urlInput}
//                     disabled={inputDisabled}
//                     onClick={() => onClickInput(index)}
//                 />
//                 <div className={styles.giftLinkUserConnected}>
//                     <FontAwesomeIcon
//                         className={`${styles.saveIcon} ${styles.giftIcon}`}
//                         style={editingGift ? null : { display: "none" }}
//                         icon={faFloppyDisk}
//                         onClick={openModal}
//                     />
//                     <FontAwesomeIcon
//                         className={`${styles.returnIcon} ${styles.giftIcon}`}
//                         style={editingGift ? null : { display: "none" }}
//                         icon={faRotateLeft}
//                         onClick={returnChanges}

//                     />
//                     <FontAwesomeIcon
//                         className={`${styles.givedIcon} ${styles.giftIcon}`}
//                         icon={faGift}
//                         onClick={() => handleOfferedClick(index, idListe, data.offered)}
//                     />

//                     {/* <div className={styles.giftInputIconsContainer}> */}
//                     {position !=="premier" && <FontAwesomeIcon
//                         className={`${styles.arrowIcon} ${styles.giftIcon}`}
//                         icon={faCircleChevronUp}
//                         onClick={()=>giftUp(data.id)}
//                     />}
//                     {position !=="dernier" && <FontAwesomeIcon
//                         className={`${styles.arrowIcon} ${styles.giftIcon}`}
//                         icon={faCircleChevronDown}
//                         onClick={()=>giftDown(data.id)}
                        
//                     />}
//                     {/* </div> */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserConnectedGiftDetail;