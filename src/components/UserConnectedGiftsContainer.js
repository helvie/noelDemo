import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { useEffect } from 'react';

function UserConnectedGiftsContainer(props) {


    //....Récupération des données contenues dans les propriétés de composants
    const {
        key,
        color,
        isExpanded,
        onClick,
        data,
        parentChangeInParent,
        onInputChange,
        editingGift,
        inputDisabled,
        resetGift
    } = props;


    const handleInputChange = (modifiedDataFromChildren) => {
        parentChangeInParent(modifiedDataFromChildren)
    }

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