import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetailOffered from './UserConnectedGiftDetailOffered';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionNameSeparation from './smallElements/SectionNameSeparation';

//______________________________________________________________________________


function UserConnectedGiftsContainer(props) {

    let nbGifts = 0;

    //....Récupération des données contenues dans les propriétés de composants
    const {
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
        addNewGift,
        handleOfferedClick,
        idListe

    } = props;

    // console.log("editinggift "+editingGift)



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
    // const handleInputChange = (modifiedDataFromChildren) => {
    //     inputChangeInParent(modifiedDataFromChildren)
    // }

    //______________________________________________________________________________

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const offeredGiftsList = data.gifts
        //....récupérés du tableau de données tableau de données
        ? data.gifts.filter(gift => gift.offered === true).map((data, index) => (
            //....un composant par cadeau
            <UserConnectedGiftDetailOffered
                //....clé unique obligatoire
                key={data.id}
                //....c'est pareil mais je pensais qu'on pouvait l'appeler index pis non
                index={data.id}
                //....données
                data={data}
                idListe={idListe}

                handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
            />

        ))
        :
        //....S'il n'y a pas de données aucun renvoi
        null;

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const giftsList = data.gifts
        //....récupérés du tableau de données tableau de données
        ? data.gifts.filter(gift => gift.offered === false).map((data, index) => (
            //....un composant par cadeau
            <UserConnectedGiftDetail
                //....clé unique obligatoire
                key={data.id}
                //....c'est pareil mais je pensais qu'on pouvait l'appeler index pis non
                index={data.id}
                //....fonction de détection de changement de cadeau à éditer
                onClickInput={(giftId) => onClickInput(giftId)}
                //....données
                data={data}
                //....fonction de gestion de changement des inputs
                onInputChange={(changeObject) => inputChangeInParent(changeObject)}
                //....booléen cadeau en cours de modification
                editingGift={editingGift === data.id}
                //....statut de l'édition des inputs
                inputDisabled={inputDisabled}
                //....booléen réinitialisation des input si pas d'enregistrement dans modale
                resetGift={resetGift === index}
                //....fonction d'enregistrement
                saveChanges={saveChanges}
                idListe={idListe}

                handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}

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
                        <div className={styles.addGiftIconContainer}>

                            <FontAwesomeIcon
                                className={styles.addGiftIconUser}
                                icon={faFileCirclePlus}
                                onClick={handleAddNewGift}
                            />
                        </div>

                        <div className={styles.giftsList}>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {giftsList}
                        </div>
                        <div className={styles.offeredGiftsList}>
                            <p className={styles.startSeparationSection}
                                style={{ fontSize: "30px", color: "#7c660e", letterSpacing: "12px" }}>&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;
                            </p>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {offeredGiftsList}
                            <p className={styles.startSeparationSection}
                                style={{ fontSize: "30px", color: "#7c660e", letterSpacing: "12px" }}>&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;
                            </p>
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