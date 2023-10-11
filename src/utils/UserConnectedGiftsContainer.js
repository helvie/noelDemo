import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { useEffect } from 'react';

function UserConnectedGiftsContainer(props) {

    // //....Etat stockant le cadeau en cours de modification
    // const [editingGift, setEditingGift] = useState(-1);

    // //....Etat stockant le cadeau d'avant qui était en cours de modification. Utile
    // //....quand un autre cadeau est en cours de modification mais que celui-ci n'est
    // //....pas encore enregistré (quand la modale est affichée)
    // const [lastEditingGift, setLastEditingGift] = useState(-1);

    // //....Etat stockant le cadeau sur lequel faire un reset en cas d'annulation
    // //....dans la modale (permet, au changement, de déclencher la modification du
    // //....composant)
    // const [resetGift, setResetGift] = useState(-1);

    // //....Etat gérant l'activation ou désactivation des inputs lors de l'affichage
    // //....la modale
    // const [inputDisabled, setInputDisabled] = useState(false);

    // //....Etat stockant les données modifiées récupérées du composant enfant
    // const [modifiedData, setModifiedData] = useState(null);

    // //....Etat gérant le dépliage de la section
    // // const [openedDetailIndex, setOpenedDetailIndex] = useState(null);

    // //....Etat gérant l'ouverture de la modale
    // const [modalOpen, setModalOpen] = useState(false);

//------------------------------------------------------------------------
    // const [newEditing, setNewEditing] = useState(false);

    // const [editingData, setEditingData] = useState({
    //     isEditing: false,
    //     titleInput: '',
    //     textInput: '',
    //     urlInput: '',
    //     index: null,
    // });
//------------------------------------------------------------------------

    //....Récupération des données contenues dans les propriétés de composants
    const {
        key,
        color,
        isExpanded,
        onClick,
        data,
        // isEditing,
        // modalDisplay,
        // setModalDisplay,
        // changeIsEditing
        parentChangeInParent,
        onInputChange,
        editingGift,
        inputDisabled,
        resetGift
    } = props;

    //....A chaque mise à jour du composant, déclenchement de la fonction

//------------------------------------------------------------------------
    // useEffect(() => {
    //     if (modalDisplay) {
    //         sectionNameClickAndChange();
    //     }
    // }, [modalDisplay]);
//------------------------------------------------------------------------


//     // Fonction d'ouverture de la modale
//     const openModal = (index) => {

//         //....Ouverture de la modale grâce à l'état mis à true. 
//         setModalOpen(true);

//         //....Changement de l'état de modification, non autorisée, des inputs
//         setInputDisabled(true);

// //------------------------------------------------------------------------
//         // setEditingData({
//         //     isEditing: false,
//         //     titleInput: '',
//         //     textInput: '',
//         //     urlInput: '',
//         //     index,
//         // });
// //------------------------------------------------------------------------

//     };

//     //....Fonction de fermeture de la modale
//     const closeModal = () => {
//         //....Fermeture de la modale grâce à l'état mis à false. 
//         setModalOpen(false);
//         //....Changement de l'état de modification, à nouveau autorisée, des inputs
//         setInputDisabled(false);
//     };

//     //....Fonction pour gérer l'enregistrement des modifications
//     const handleSaveChanges = () => {
//         newEditing ? changeIsEditing(true) : changeIsEditing(false)
//         setModalDisplay(false)
//         closeModal();
//     };

//     //....Fonction pour réinitialiser les données
//     const resetData = () => {
//         //...Stockage des données de l'avant dernier cadeau mis en modification
//         //...afin de déclencher la réinitialisation des champs
//         setResetGift(lastEditingGift);

// //------------------------------------------------------------------------
//         // newEditing ? changeIsEditing(true) : changeIsEditing(false)
//         // setModalDisplay(false)
// //------------------------------------------------------------------------

//         closeModal();
//     };

    //....Fonction implémentée dans le composant UserConnectedGiftDetail, qui, se
    //....déclenche à chaque modification dans un input
//     const handleInputChange = (modifiedDataFromChildren) => {

//         console.log(modifiedDataFromChildren)

//         //....Récupération de l'index du composant modifié
//         const idx = modifiedDataFromChildren.index;

// //------------------------------------------------------------------------
//         // setNewEditing(true);
// //------------------------------------------------------------------------

//         {
//             //....si aucun cadeau n'a encore été mis en statut modification ou le
//             //....cadeau en mode modification est déjà stocké
//             editingGift === -1 || idx === editingGift ?

//                 //....Stockage des données récupérées de l'enfant
//                 (setModifiedData(modifiedDataFromChildren)
//                     // changeIsEditing(true)
//                 )
//                 :
//                 //....Sinon ouverture de la modale d'enregistrement
//                 openModal(idx);

//             //....Mise à jour du stockage : cadeau en cours stocké dans dernier cadeau
//             setLastEditingGift(editingGift);

//             //....et nouveau cadeau stocké dans cadeau en cours
//             setEditingGift(idx);
//         }
//     };

    const handleInputChange = (modifiedDataFromChildren) => {
        parentChangeInParent(modifiedDataFromChildren)
    }

//------------------------------------------------------------------------
    // if(isEditing === true){sectionNameClickAndChange()}

    // const sectionNameClickAndChange = () => {
    //     setNewEditing(false);
    //     console.log("essaiiiii")
    //     const idx = modifiedData.index;
    //     openModal(idx);
    //     setLastEditingGift(editingGift);
    //     setEditingGift(idx);
    //     changeIsEditing(false);
    // }
//------------------------------------------------------------------------

    //....Fonction de dépliage ou pliage du cadau au clique sur le + ou le -
    const handleGiftClick = (index) => {

        //....Si le détail du cadeau est déjà déplié car stocké dans l'état
        if (openedDetailIndex === index) {

            //....Destockage du cadeau dans l'état pour déclenchement du pliage
            setOpenedDetailIndex(null);
        } else {

            //....Sinon, stockage du cadeau et depliage
            setOpenedDetailIndex(index);
        }
    };

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const giftsList = data.gifts
        //....récupérés du tableau de données tableau de données
        ? data.gifts.map((data, index) => (
            //....un composant par cadeau
            <UserConnectedGiftDetail
                //....clé unique obligatoire
                index={index}
                //....fonction de dépliage de la section
                onClick={() => handleGiftClick(index)}
                //....données
                data={data}
                //....fonction de gestion de changement des inputs
                onInputChange={handleInputChange}
                //....booléen cadeau en cours de modification
                editingGift={editingGift === index}
                //....statut de l'édition des inputs
                inputDisabled={inputDisabled} 
                //....booléen réinitialisation des input si pas d'enregistrement dans modale
                resetGift={resetGift === index}
            />

        ))
        : 
        //....S'il n'y a pas de données aucun renvoi
        null;

    //....Affichage
    return (
        <>
            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: color }}
            >
                Moi - {props.data.pseudo}
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection} style={{ backgroundColor: color }}>
                    <div className={styles.absoluteContainer}>
                        <StartSeparationSection />
                        <div className={styles.giftsList}>{giftsList}</div>
                        <EndSeparationSection />
                    </div>
                </div>
            </div>


        </>
    );
}

export default UserConnectedGiftsContainer;