import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserConnectedGiftDetailOffered from './UserConnectedGiftDetailOffered';
import UserConnectedGiftDetail from './UserConnectedGiftDetail';
import EndSeparationSection from './smallElements/EndSeparationSection';
import SectionNameSeparation from './smallElements/SectionNameSeparation';
import { useSelector } from 'react-redux';

//______________________________________________________________________________


function UserConnectedGiftsContainer(props) {




    const [addedNewGift, setAddedNewGift] = useState(null);

    const user = useSelector((state) => state.user);


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
        orderChange,
        lowestOrderGift,
        userDataChange,
        setEditingGift,
        editingMoveGift
    } = props;

    const noOfferedGifts = props.noOfferedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre));
    const offeredGifts = props.offeredGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre));



    //______________________________________________________________________________

    //....Fonction de gestion d'ajout de nouveau cadeau
    const handleAddNewGift = () => {

        // Création d'un objet pour le nouveau cadeau (title, detail, url, etc.)
        const newEmptyGift = {
            title: "",
            detail: "",
            url: "",
            id: 999999,
            Ordre: lowestOrderGift - 1,
            date: formattedDate,
            offered: false
        };


        // Appel de la fonction pour ajouter le nouveau cadeau chez le parent
        addNewGift(newEmptyGift, idListe);
    };

    
    //______________________________________________________________________________
    //....Création de la variable contenant les div d'affichage des différents cadeaux
    
    
    const offeredGiftsListSection = offeredGifts
        //....récupérés du tableau de données tableau de données
        ? offeredGifts

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



    const newEmptyGiftSection =

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
    const giftsListSection = noOfferedGifts
        //....récupérés du tableau de données tableau de données
        ? noOfferedGifts
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
                    editingGift={editingGift}
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

                    position={index === noOfferedGifts.length - 1 ? "dernier" :
                        index === 0 ? "premier" : "milieu"}

                    setEditingGift={(idNumber)=>setEditingGift(idNumber)}

                    editingMoveGift={editingMoveGift}

                />

            ))
        :
        //....S'il n'y a pas de données aucun renvoi
        null;

    { nbGifts = noOfferedGifts ? noOfferedGifts.length : 0 }

    // Fonction qui retourne le contenu JSX conditionnel
    const renderAddGiftIcon = () => {

        if (!noOfferedGifts.find(item => item.id === 999999)) {
            return (
                <div className={styles.addGiftIconContainer}>

                    <img className={styles.addGiftIcon}
                        src={"images/add.png"}
                        alt="Image"
                        height="40px"
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

                {user.name &&<p className={styles.userConnectedPseudo}>Moi {user.name}<span className={styles.nbGifts}> {nbGifts} &copy;
                </span>
                </p>}
                <div className={isExpanded ? styles.separationHide : styles.separationDisplay}>
                    <SectionNameSeparation />
                </div>
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection}>
                    <div className={styles.absoluteContainer}>

                        {renderAddGiftIcon()}

                        {addedNewGift && newEmptyGiftSection}
                        <div className={styles.giftInputContainer}>
                            {orderChange &&
                                <div className={styles.giftsList}>
                                    {/*...Affichage du JSX stocké dans la variable giftsList */}
                                    {noOfferedGifts && giftsListSection}
                                </div>
                            }
                        </div>

                        <div className={styles.offeredGiftsList}>
                            <p className={styles.startSeparationOfferedGift}>
                                &#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;&#062;
                            </p>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {offeredGiftsListSection}
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