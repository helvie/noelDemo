import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { useEffect } from 'react';

function UserConnectedGiftsContainer(props) {
    const [editingGift, setEditingGift] = useState(-1);
    const [lastEditingGift, setLastEditingGift] = useState(-1);
    const [resetGift, setResetGift] = useState(-1);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [modifiedData, setModifiedData] = useState(null);

    const [openedDetailIndex, setOpenedDetailIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newEditing, setNewEditing] = useState(false);

    const [editingData, setEditingData] = useState({
        isEditing: false,
        titleInput: '',
        textInput: '',
        urlInput: '',
        index: null,
    });

    const { data, onClick, isExpanded, onChange, changeIsEditing, modalDisplay, setModalDisplay, isEditing } = props;


    console.log("newediting "+newEditing)
    console.log(isEditing)

    useEffect(() => {
        if (modalDisplay) {
            sectionNameClickAndChange();
        }
    }, [modalDisplay]);

    console.log("modified data " + modifiedData)

    // Fonction pour ouvrir la modale
    const openModal = (index) => {
        setModalOpen(true);
        setInputDisabled(true); // Désactiver les champs d'entrée lorsque la modale est ouverte

        setEditingData({
            isEditing: false,
            titleInput: '',
            textInput: '',
            urlInput: '',
            index,
        });
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setModalOpen(false);
        setModalDisplay(false)
        setInputDisabled(false); // Réactiver les champs d'entrée lorsque la modale est fermée
    };

    // Fonction pour gérer l'enregistrement des modifications
    const handleSaveChanges = () => {
        newEditing?changeIsEditing(true):changeIsEditing(false)
        setModalDisplay(false)

        // Enregistrez les modifications en base de données ici
        // Mettez à jour les inputs avec les nouvelles données si nécessaire
        closeModal();
    };

    // Fonction pour réinitialiser les données
    const resetData = () => {
        setResetGift(lastEditingGift);
        newEditing?changeIsEditing(true):changeIsEditing(false)
        setModalDisplay(false)


        closeModal();
        // Réinitialisez les données ici si nécessaire
    };

    const handleInputChange = (modifiedDataFromChildren) => {
        const idx = modifiedDataFromChildren.index;
        setNewEditing(true);

        {
            editingGift === -1 || idx === editingGift ?
                (setModifiedData(modifiedDataFromChildren), changeIsEditing(true))
                :
                openModal(idx);
            setLastEditingGift(editingGift);
            setEditingGift(idx);
        }
    };

    // if(isEditing === true){sectionNameClickAndChange()}

    const sectionNameClickAndChange = () => {
        setNewEditing(false);
        console.log("essaiiiii")
        const idx = modifiedData.index;
        openModal(idx);
        setLastEditingGift(editingGift);
        setEditingGift(idx);
        changeIsEditing(false);
    }


    const handleGiftClick = (index) => {
        if (openedDetailIndex === index) {
            setOpenedDetailIndex(null);
        } else {
            setOpenedDetailIndex(index);
        }
    };

    const giftsList = data.gifts
        ? data.gifts.map((data, index) => (
            <div className={styles.gift} key={index}>
                <GiftDetail
                    isExpanded={openedDetailIndex === index}
                    onClick={() => handleGiftClick(index)}
                    data={data}
                    index={index}
                    onInputChange={handleInputChange}
                    editingGift={editingGift === index}
                    inputDisabled={inputDisabled} // Utilisez inputDisabled pour désactiver les champs                    resetGift={resetGift === index}
                    resetGift={resetGift === index}
                />
            </div>
        ))
        : null;

    return (
        <>
            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: props.color }}
            >
                Moi - {props.data.pseudo}
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection} style={{ backgroundColor: props.color }}>
                    <div className={styles.absoluteContainer}>
                        <StartSeparationSection />
                        <div className={styles.giftsList}>{giftsList}</div>
                        <EndSeparationSection />
                    </div>
                </div>
            </div>

            {/* Afficher la modale si elle est ouverte */}
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalDialog}>
                        {/* <button className={styles.modalCloseButton} onClick={closeModal}></button> */}
                        <p>Voulez-vous enregistrer les modifications ?</p>
                        <button onClick={handleSaveChanges}>Enregistrer</button>
                        <button onClick={resetData}>Annuler</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserConnectedGiftsContainer;