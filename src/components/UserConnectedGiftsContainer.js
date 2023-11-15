import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetailOffered from './UserConnectedGiftDetailOffered';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionNameSeparation from './smallElements/SectionNameSeparation';
import { useEffect } from 'react';
//______________________________________________________________________________


function UserConnectedGiftsContainer(props) {



    const [addedNewGift, setAddedNewGift] = useState(null);


    const myDate = new Date();
    const formattedDate = `${myDate.getFullYear()}-${String(myDate.getMonth() + 1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')} ${String(myDate.getHours()).padStart(2, '0')}:${String(myDate.getMinutes()).padStart(2, '0')}:${String(myDate.getSeconds()).padStart(2, '0')}`;
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
        editingGiftToFalse,
        inputDisabled,
        openModalInHome,
        onClickInput,
        addNewGift,
        handleOfferedClick,
        idListe,
        resetGift,
        giftUp,
        giftDown,
        orderChange

    } = props;

    console.log(orderChange)

    //______________________________________________________________________________

    //....Fonction de gestion d'ajout de nouveau cadeau
    const handleAddNewGift = () => {

        // Création d'un objet pour le nouveau cadeau (title, detail, url, etc.)
        const newEmptyGift = {
            title: "",
            detail: "",
            url: "",
            id: 999999,
            Ordre: 999999,
            date: formattedDate,
            offered: false
        };

        // Appel de la fonction pour ajouter le nouveau cadeau chez le parent
        addNewGift(newEmptyGift, idListe);
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
        ? data.gifts
            .sort((a, b) => b.Ordre - a.Ordre)
            .filter(gift => gift.offered === true)

            .map((data, index) => (
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



    const newEmptyGift =

        <UserConnectedGiftDetail
            //....clé unique obligatoire
            key="999999"
            //....
            index="999999"
            //....fonction de détection de changement de cadeau à éditer
            onClickInput={(giftId) => onClickInput(giftId)}
            //....données
            data=""
            //....fonction de gestion de changement des inputs
            onInputChange={(changeObject) => inputChangeInParent(changeObject)}
            //....booléen cadeau en cours de modification
            editingGift={editingGift === 999999}
            //....statut de l'édition des inputs
            inputDisabled={inputDisabled}
            //....fonction d'enregistrement
            openModalInHome={openModalInHome}
            idListe={idListe}

            handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
            giftUp={(id) => giftUp(id)}
            giftDown={(id) => giftDown(id)}

        />



    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const giftsList = data.gifts
        //....récupérés du tableau de données tableau de données
        ? data.gifts.filter(gift => gift.offered === false)
            .sort((a, b) => b.Ordre - a.Ordre)
            .map((data, index) => (
                //....un composant par cadeau


                <UserConnectedGiftDetail
                    //....clé unique obligatoire
                    key={data.id}
                    //....
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
                    //....fonction d'enregistrement
                    openModalInHome={openModalInHome}
                    idListe={idListe}
                    resetGift={resetGift === data.id}
                    editingGiftToFalse={editingGiftToFalse}

                    handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
                    giftUp={(id) => giftUp(id)}
                    giftDown={(id) => giftDown(id)}

                />

            ))
        :
        //....S'il n'y a pas de données aucun renvoi
        null;

    { nbGifts = data.gifts ? data.gifts.filter(gift => !gift.offered).length : 0 }

    // Fonction qui retourne le contenu JSX conditionnel
    const renderAddGiftIcon = () => {

        if (!data.gifts.find(item => item.id === 999999)) {
            return (
                <div className={styles.addGiftIconContainer}>
                    <FontAwesomeIcon
                        className={styles.addGiftIcon}
                        icon={faFileCirclePlus}
                        onClick={handleAddNewGift}
                    />
                </div>
            );
        }
        // Retourne null si la condition n'est pas satisfaite
        return null;
    };

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
                </span>
                </p>
                <div className={isExpanded ? styles.separationHide : styles.separationDisplay}>
                    <SectionNameSeparation />
                </div>
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection}>
                    <div className={styles.absoluteContainer}>

                        {/*...Affichage du composant */}
                        {/* <StartSeparationSection /> */}

                        {renderAddGiftIcon()}

                        {addedNewGift && newEmptyGift}
                        <div className={styles.giftInputContainer}>
                            {orderChange &&
                                <div className={styles.giftsList}>
                                    {/*...Affichage du JSX stocké dans la variable giftsList */}
                                    {giftsList}
                                </div>
                            }
                        </div>

                        <div className={styles.offeredGiftsList}>
                        <p className={styles.startSeparationOfferedGift}>
                            &#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;
                            </p>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {offeredGiftsList}
                            <p className={styles.startSeparationOfferedGift}>
                                &#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;
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