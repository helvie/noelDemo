import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'
import { usersArray } from '../utils/datas';


function HomePage() {

    //############################### ETATS #################################

    //.....Etat gérant le dépliage des sections autres que celle de l'user
    const [openedSectionIndex, setOpenedSectionIndex] = useState(null);

    //.....Etat gérant le dépliage de la section de l'user
    const [openedSectionUser, setOpenedSectionUser] = useState(false);

    //.....Etat datas importées d'un fichier local
    const [datas, setDatas] = useState(usersArray);

    //....Etat stockant le cadeau en cours de modification
    const [editingGift, setEditingGift] = useState(-1);

    //....Etat stockant le cadeau d'avant qui était en cours de modification. Utile
    //....quand un autre cadeau est en cours de modification mais que celui-ci n'est
    //....pas encore enregistré (quand la modale est affichée)
    const [lastEditingGift, setLastEditingGift] = useState(-1);

    //....Etat stockant le cadeau sur lequel faire un reset en cas d'annulation
    //....dans la modale (permet, au changement, de déclencher la modification du
    //....composant)
    const [resetGift, setResetGift] = useState(-1);

    //....Etat gérant l'activation ou désactivation des inputs lors de l'affichage
    //....la modale
    const [inputDisabled, setInputDisabled] = useState(false);

    //....Etat stockant les données modifiées récupérées du composant enfant
    const [modifiedData, setModifiedData] = useState(null);

    //....Etat gérant l'ouverture de la modale
    const [modalOpen, setModalOpen] = useState(false);

    const [modalOpenFromHome, setModalOpenFromHome] = useState(false);


    // const [isLoading, setIsLoading] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [modalDisplay, setModalDisplay] = useState(false);

    //########################################################################

    let colorNumber = 1;

    //.....couleurs des sections de personnes (jaune, vert, rose pâle)
    const colors = ["#FFD700", "#7fa348", "#f3e4df"]



    //############################ FONCTIONS #################################

    //.....Dépliage déclenché au click sur la section d'une personne 
    const handleSectionClick = (index) => {

        //------------------------------------------------------------------------
        // if (isEditing) { setModalDisplay(true) }
        //------------------------------------------------------------------------

        //.....Si la section actuelle est celle qui est ouverte et stockée
        if (openedSectionIndex === index) {

            //....Déclenchement de la fermeture en la destockant
            setOpenedSectionIndex(null);
        } else {

            //....Sinon, stockage de l'index actuel, provoquant l'ouverture et la fermeture des autres
            setOpenedSectionIndex(index);

            //....Fermeture de la section de l'user en mettant l'état à false
            setOpenedSectionUser(false)
        }
    };

    //.....Dépliage et ouverture modale déclenchée au click sur la section de l'user 
    const handleUserSectionClick = () => {
        
        console.log("déclenché !!!"+openedSectionUser)

        //....Récupération de l'index du composant modifié
        const idx = modifiedData ? modifiedData.index : null;

        {
            openedSectionUser?setModalOpenFromHome(true):null
            //....si un cadeau est en édition
            editingGift!==-1 ?

                //....Sinon ouverture de la modale d'enregistrement
                openModal(idx) : null

        }


        //.....Si la section de l'user est celle qui est ouverte et stockée
        if (openedSectionUser) {

            //....Déclenchement de la fermeture en la destockant
            setOpenedSectionUser(false)
        }
        else {
            //....Sinon, stockage de l'index actuel provoquant l'ouverture
            setOpenedSectionUser(true);

            //....Destockage dans les états des autres personnes, provoquant la fermeture
            setOpenedSectionIndex(null)
        }
    }

    //....Ouverture de la modale
    const openModal = (index) => {

        //....Ouverture de la modale grâce à l'état mis à true. 
        setModalOpen(true);

        //....Changement de l'état de modification, non autorisée, des inputs
        setInputDisabled(true);

        //------------------------------------------------------------------------
        // setEditingData({
        //     isEditing: false,
        //     titleInput: '',
        //     textInput: '',
        //     urlInput: '',
        //     index,
        // });
        //------------------------------------------------------------------------

    };

    //....Fermeture de la modale
    const closeModal = () => {

        
        //....Fermeture de la modale grâce à l'état mis à false. 
        setModalOpen(false);
        //....Changement de l'état de modification, à nouveau autorisée, des inputs
        setInputDisabled(false);
    };

    //....Gestion de l'enregistrement des modifications depuis la modale
    const handleSaveChanges = () => {



        modalOpenFromHome ? setEditingGift(-1) : null
        setModalOpenFromHome(false)

        // newEditing ? changeIsEditing(true) : changeIsEditing(false)
        // setModalDisplay(false)
        closeModal();
    };

    //....Réinitialisation des données au clic sur annuler dans modale
    const resetData = () => {

        console.log("modalOpenFromHome "+modalOpenFromHome)
        // console.log("modalopen "+modalOpen)
        console.log(editingGift)

        modalOpenFromHome ? setEditingGift(-1) : null
        setModalOpenFromHome(false)

        //...Stockage des données de l'avant dernier cadeau mis en modification
        //...afin de déclencher la réinitialisation des champs
        setResetGift(lastEditingGift);

        //....Fermeture de la modale
        closeModal();
    };

    //....Fonction implémentée dans le composant UserConnectedGiftDetail, qui, se
    //....déclenche à chaque modification dans un input
    const handleInputChange = (modifiedDataFromChildren) => {

        console.log(modifiedDataFromChildren)

        //....Récupération de l'index du composant modifié
        const idx = modifiedDataFromChildren.index;

        {
            //....si aucun cadeau n'a encore été mis en statut modification ou le
            //....cadeau en mode modification est déjà stocké
            editingGift === -1 || idx === editingGift ?

                //....Stockage des données récupérées de l'enfant
                (setModifiedData(modifiedDataFromChildren)
                    // changeIsEditing(true)
                )
                :
                //....Sinon ouverture de la modale d'enregistrement
                openModal(idx);

            //....Mise à jour du stockage : cadeau en cours stocké dans dernier cadeau
            setLastEditingGift(editingGift);

            //....et nouveau cadeau stocké dans cadeau en cours
            setEditingGift(idx);
        }
    };

    //######################### JSX STOCKE DANS VARIABLES #######################

    //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
    //....création d'un composant user par donnée. Envoi dans le composant des
    //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
    //....modification d'un état utilisé par le composant, celui ci se mettra à jour
    const connectedUserSection = datas
        .filter((data) => data.pseudo === "Armel")
        .map((data, i) => {
            const color = colors[0];
            return (
                //....composant user
                <UserConnectedGiftsContainer
                    //....clé unique obligatoire
                    key={i}
                    //....background color
                    color={color}
                    //....statut depliage de la section
                    isExpanded={openedSectionUser}
                    //....fonction de dépliage de la section
                    onClick={() => handleUserSectionClick(i)}
                    //....données
                    data={data}
                    //....
                    parentChangeInParent={handleInputChange}
                    //....fonction de gestion de changement des inputs
                    onInputChange={handleInputChange}
                    //....booléen cadeau en cours de modification
                    editingGift={editingGift}
                    //....statut de l'édition des inputs
                    inputDisabled={inputDisabled}
                    //....booléen réinitialisation des input si pas d'enregistrement dans modale
                    resetGift={resetGift}
                />
            )
        })

    //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
    //....création d'un composant personne par donnée.
    const personsSections = datas
        .filter((data) => data.pseudo !== "Armel")
        .map((data, i) => {
            const color = colors[colorNumber];
            colorNumber = colorNumber === colors.length - 1 ? 0 : colorNumber + 1;
            return (
                //....composants personnes
                <GiftsContainer
                    //....clé unique obligatoire
                    key={i}
                    //....background color
                    color={color}
                    //....statut depliage de la section (true si index stocké dans l'état)
                    isExpanded={openedSectionIndex === i}
                    //....fonction de dépliage de la section
                    onClick={() => handleSectionClick(i)}
                    //....données
                    data={data}
                />
            )
        })

    //############################## AFFICHAGE #################################

    return (
        <main>
            <div className={styles.orgContent}>

                {/* {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : ( */}
                <>
                    <div className={styles.firstSection}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit
                    </div>
                    {/*...Affichage du jsx stocké dans la variable connectedUserSection */}
                    {connectedUserSection}

                    {/* Afficher la modale si elle est en statut ouverte */}
                    {modalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modalDialog}>
                                {/* <button className={styles.modalCloseButton} onClick={closeModal}></button> */}
                                <p>On enregistre "{modifiedData.titleInput}" ?</p>
                                <button onClick={handleSaveChanges}>Oui, j'enregistre !</button>
                                <button onClick={resetData}>Non, remets comme avant !</button>
                            </div>
                        </div>
                    )}

                    {/*...Affichage des divs stockées dans la variable personsSections */}
                    {personsSections}

                </>
                {/* )} */}
            </div>
        </main >

    );
}

export default HomePage;