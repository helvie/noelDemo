import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionNameSeparation from './smallElements/SectionNameSeparation';

//______________________________________________________________________________


function UserConnectedGiftsContainer(props) {

    let nbGifts = 0;

    //....Récupération des données contenues dans les propriétés de composants
    const {
        key,
        color,
        isExpanded,
        onClick,
        data,
        inputChangeInParent,
        // onInputChange,
        editingGift,
        inputDisabled,
        resetGift,
        saveChanges,
        onClickInput,
        addNewGift

    } = props;

    console.log("editingGif in container : " + editingGift)
    console.log("resetGift in container : " + resetGift)


    //______________________________________________________________________________

    //....Fonction de gestion d'ajout de nouveau cadeau
    const handleAddNewGift = () => {

        // Création d'un objet pour le nouveau cadeau (title, detail, url, etc.)
        const newGiftData = {
            title: "",
            textInput: "",
            urlInput: "",
        };

        // Appel de la fonction pour ajouter le nouveau cadeau chez le parent
        addNewGift(newGiftData);
    };

    //______________________________________________________________________________

    //....Gestion de la modification des input. Envoi des données dans le parent au fur et à mesure
    const handleInputChange = (modifiedDataFromChildren) => {
        console.log("modifiedDataFromChildren in container : "
            + modifiedDataFromChildren.giftKey)
        inputChangeInParent(modifiedDataFromChildren)
    }

    //______________________________________________________________________________

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const giftsList = data.gifts
        //....récupérés du tableau de données tableau de données
        ? data.gifts.map((data, index) => (
            //....un composant par cadeau
            <UserConnectedGiftDetail
                //....clé unique obligatoire
                key={index}
                //....c'est pareil mais je pensais qu'on pouvait l'appeler index pis non
                index={index}
                //....fonction de détection de changement de cadeau à éditer
                onClickInput={() => onClickInput(index)}
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
                //....fonction d'enregistrement
                saveChanges={saveChanges}

            />

        ))
        :
        //....S'il n'y a pas de données aucun renvoi
        null;

    { nbGifts = data.gifts ? data.gifts.length : 0 }

    //______________________________________________________________________________


    //....Affichage
    return (
        <>
            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: color }}
            >
                <SectionNameSeparation />

                <p className={styles.userConnectedPseudo}>Moi {props.data.pseudo}<span className={styles.nbGifts}> {nbGifts} &copy;
                </span></p>
                <div className={isExpanded ? styles.separationHide : styles.separationDisplay}>
                    <SectionNameSeparation />
                </div>
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection} style={{ backgroundColor: color }}>
                    <div className={styles.absoluteContainer}>

                        {/*...Affichage du composant */}
                        <StartSeparationSection />

                        <div className={styles.giftsList}>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {giftsList}
                        </div>

                        <div className={styles.caddyIconContainer}>

                            <FontAwesomeIcon
                                className={styles.caddyIconUser}
                                icon={faCartPlus}
                                onClick={handleAddNewGift}
                            />

                        </div>

                        {/*...Affichage du composant */}
                        <EndSeparationSection />

                    </div>
                </div>
            </div>


        </>
    );
}

export default UserConnectedGiftsContainer;