import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'
import { usersArray } from '../utils/datas';
import axios from 'axios';
import { useEffect } from 'react';
import { envVariables } from '../../env';

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

    //....Etat stockant la section en attente de la réponse de la modale pour ouverture ou fermeture
    const [sectionToOpenOrClose, setSectionToOpenOrClose] = useState(-1);

    //....Etat indiquant d'où la modale a été ouverte (d'un input à l'autre ou en
    //....ouvrant une nouvelle section)
    const [modalOpenFromHome, setModalOpenFromHome] = useState(false);

    //....Etat gérant l'ouverture de la modale de cadeau volé
    const [giftSavedModalVisible, setGiftSavedModalVisible] = useState(false);

    // const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState("");
    const [giftsList2, setGiftsList2] = useState(null)
    const [connectedUserSection, setConnectedUserSection] = useState(null)
    const [personsSections, setPersonsSections] = useState(null)


    //########################################################################

    let colorNumber = 1;

    //.....couleurs des sections de personnes (jaune, vert, rose pâle)
    const colors = ["#FFD700", "#7fa348", "#f3e4df"]

    // useEffect(() => {

    //     fetch("http://noel.helvie.fr/api/gettoken.php", {
    //         headers: envVariables,
    //     })
    //         .then(response => response.text())
    //         .then(data => {
    //             setToken(data)

    //             fetch("http://noel.helvie.fr/api/getlistes.php", {
    //                 headers:
    //                 {
    //                     "user-name":"moarmel",
    //                     "app-name":"NoelTan",
    //                     "noel-token": token
    //                 }

    //             })
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     console.log(data);
    //                     setGiftsList2(data)
    //                     // console.log(giftsList2)
    //                 })
    //                 .catch(error => {
    //                     console.log("zarbi")

    //                 });

    //         })
    //         .catch(error => {
    //             console.log("Token raté")

    //         });

    // }, []);
    useEffect(() => {
    
        fetch("https://noel.helvie.fr/api/gettoken.php", {
            headers: envVariables,
        })
        .then(response => response.text())
        .then(tokenData => { // Renommez la variable ici
            console.log(tokenData)
                setToken(tokenData);
    
            fetch("https://noel.helvie.fr/api/getlistesetcadeaux.php", {
                headers: {
                    "user-name":"moarmel",
                    "app-name":"NoelTan",
                    "noel-token": tokenData // Utilisez la variable renommée ici
                }
            })
            .then(response => response.json())
            .then(giftsData => { // Renommez la variable ici
                console.log(giftsData)
                    setGiftsList2(giftsData);
            })
            .catch(error => {
                console.log("Erreur lors de la récupération des listes");
            });
    
        })
        .catch(error => {
            console.log("Erreur lors de la récupération du token");
        });
    
    }, []);

    useEffect(() => {



    //######################### JSX STOCKE DANS VARIABLES #######################

    //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
    //....création d'un composant user par donnée. Envoi dans le composant des
    //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
    //....modification d'un état utilisé par le composant, celui ci se mettra à jour
    let connectedUserSectionMapping;
    
    if(giftsList2){
        connectedUserSectionMapping = giftsList2
        .filter((data) => data.pseudo === "Armel")
        .map((data, i) => {
            const color = colors[0];
            return (
                //....composant user
                <UserConnectedGiftsContainer
                    //....clé unique obligatoire
                    key={-2}
                    //....background color
                    color={color}
                    //....statut depliage de la section
                    isExpanded={openedSectionUser}
                    //....fonction de dépliage de la section
                    onClick={() => handleUserSectionClick(i)}
                    //....fonction de dépliage de la section
                    onClickInput={(index) => handleInputClick(index)}
                    //....données
                    data={data}
                    //....
                    inputChangeInParent={handleInputChange}
                    //....fonction de gestion de changement des inputs
                    onInputChange={handleInputChange}
                    //....booléen cadeau en cours de modification
                    editingGift={editingGift}
                    //....statut de l'édition des inputs
                    inputDisabled={inputDisabled}
                    //....booléen réinitialisation des input si pas d'enregistrement dans modale
                    resetGift={resetGift}
                    //....fonction d'enregistrement
                    saveChanges={openModal}
                    //....fonction d'ajout de nouveau cadeau
                    addNewGift={addNewGift}

                />
            )
        })}

        setConnectedUserSection(connectedUserSectionMapping)

    //______________________________________________________________________________


    //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
    //....création d'un composant personne par donnée.
    let personsSectionsMapping;
    
    if(giftsList2){personsSectionsMapping = giftsList2
        .filter((data) => data.login !== "moarmel")
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
                    //....fonction de vol de cadau
                    onClickCartPlus={stolenGiftRegistered}

                />
            )
        })
            setPersonsSections(personsSectionsMapping)

        console.log(personsSections)
        console.log(connectedUserSection)
    
    }


    }, [giftsList2, openedSectionUser, openedSectionIndex]);
    // useEffect(() => {

    //     fetch("http://noel.helvie.fr/api/check.php", {
    //         headers: envVariables,
    //     })
    //         .then(response => response.text())
    //         .then(data => {
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.log("essai1")

    //         });

    // }, []);



    //############################ FONCTIONS #################################

    //....Dépliage de la section personne si plié, pliage si déplié
    const openCloseSectionIndex = (index) => {

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
    }

    //______________________________________________________________________________


    //....Dépliage de l'user si plié, pliage si déplié
    const openCloseSectionUser = () => {

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

    //______________________________________________________________________________

    //.....Dépliage/pliage déclenché au click sur la section d'une personne 
    const handleSectionClick = (index) => {

        // console.log("cliqué !")

        //....si la section de l'user est ouverte, indication que la modale est ouverte
        //....au clic sur une section (et non sur un input)
        openedSectionUser ? setModalOpenFromHome(true) : null

        //....si un cadeau est en édition
        if (editingGift !== -1) {

            //....ouverture de la modale d'enregistrement
            openModal(index)

            //...et stockage de la section à ouvrir après réponse à la modale
            setSectionToOpenOrClose(index)
        }
        else {
            //....Sinon, gestion directe de l'ouverture/fermeture de la section
            openCloseSectionIndex(index);
        }

    };
    //______________________________________________________________________________

    //.....Dépliage/pliage et ouverture modale déclenchée au click sur la section de l'user 
    const handleUserSectionClick = () => {

        //....si la section de l'user est ouverte, indication que la modale est ouverte
        //....au clic sur une section (et non sur un input)
        openedSectionUser ? setModalOpenFromHome(true) : null

        //....si un cadeau est en édition
        if (editingGift !== -1) {

            //....ouverture de la modale d'enregistrement
            openModal("user")

            //...et stockage de la section à ouvrir après réponse à la modale
            setSectionToOpenOrClose("user")
        }
        else {
            //....Sinon, gestion directe de l'ouverture/fermeture de la section
            openCloseSectionUser();
        }

    }

    //______________________________________________________________________________

    //....Ouverture de la modale
    const openModal = (index) => {

        //....Ouverture de la modale grâce à l'état mis à true. 
        setModalOpen(true);

        //....Changement de l'état de modification, non autorisée, des inputs
        setInputDisabled(true);

    };
    //______________________________________________________________________________

    //....Fermeture de la modale
    const closeModal = () => {

        //....Si la section user était en attente d'affichage ou masquage des cadeaux
        sectionToOpenOrClose === "user" ?
            //....Lancement de la fonction pour l'user
            openCloseSectionUser() :
            //....Sinon, si elle n'est pas égale à -1, donc une section personne en attente d'affichage ou masquage
            sectionToOpenOrClose !== -1 ?
                //....Lancement de la fonction pour une personne
                openCloseSectionIndex(sectionToOpenOrClose) :
                null

        //....Fermeture de la modale grâce à l'état mis à false. 
        setModalOpen(false);
        //....Changement de l'état de modification, à nouveau autorisée, des inputs
        setInputDisabled(false);
        //....Mise à zéro de l'état stockant le cadeau en cours d'édition
        setEditingGift(-1)
        //....Mise à zéro de la section en attente d'affichage ou masquage
        setSectionToOpenOrClose(-1)
        //....Remise à zéro de l'état modale ouverte depuis section
        setModalOpenFromHome(false)


    };

    //______________________________________________________________________________

    //....Gestion de l'enregistrement des modifications depuis la modale
    const handleSaveChanges = () => {
        //....Création, à partir du tableau de données, d'une copie des datas
        const updatedDatas = datas.map((data, index) => {
            //....Si l'index du cadeau, dans le tableau, correspond à l'index du
            //....cadeau en couors de modification
            if (index === editingGift) {
                //....Initialisation de la variable du cadeau modifié
                const modifiedGiftIndex = modifiedData.index;
                //....S'il s'agit de cadeaux supplémentaires par rapport aux datas initiales
                if (modifiedGiftIndex >= 0 && modifiedGiftIndex < data.gifts.length) {
                    //....Mise à jour
                    return {
                        ...data, gifts: data.gifts.map((gift, giftIndex) => {
                            if (giftIndex === modifiedGiftIndex) {
                                return {
                                    title: modifiedData.titleInput,
                                    detail: modifiedData.textInput,
                                    url: modifiedData.urlInput,
                                    offered: false, // Mettez ici le statut du cadeau (offert ou non)
                                    date: "2023-10-09" // Mettez ici la date souhaitée
                                };
                            }
                            return gift;
                        })
                    };
                } else {
                    // Si l'index est en dehors des limites, cela signifie qu'il s'agit d'un nouveau cadeau
                    // Ajoutez le nouveau cadeau aux données existantes
                    data.gifts.push({
                        title: modifiedData.titleInput,
                        detail: modifiedData.textInput,
                        url: modifiedData.urlInput,
                        offered: false, // Mettez ici le statut du cadeau (offert ou non)
                        date: "2023-10-09" // Mettez ici la date souhaitée
                    });

                    return data;
                }
            }
            return data;
        });

        //....Mise à jour de l'état "datas" avec les datas temporaires
        setDatas(updatedDatas);

        // newEditing ? changeIsEditing(true) : changeIsEditing(false)
        // setModalDisplay(false)
        closeModal();
    };

    //______________________________________________________________________________

    //....Réinitialisation des données au clic sur annuler dans modale
    const resetData = () => {

        //....Indication dans l'état qu'aucun cadeau n'est en cours de modification
        setEditingGift(-1)

        //....Indication dans l'état qu'aucun cadeau n'est en cours de modification
        setModalOpenFromHome(false)

        //...Stockage des données de l'avant dernier cadeau mis en modification
        //...afin de déclencher la réinitialisation des champs
        setResetGift(editingGift);

        //....Fermeture de la modale
        closeModal();
    };
    //______________________________________________________________________________

    //....Fonction implémentée dans le composant UserConnectedGiftDetail, qui, se
    //....déclenche à chaque modification dans un input
    const handleInputChange = (modifiedDataFromChildren) => {
        setModifiedData(modifiedDataFromChildren)

        //....Initialisation de l'index du cadeau modifié
        const idx = modifiedDataFromChildren.index;

        //....Mise à jour de l'état indiquant quel cadeau est en cours de modification
        setEditingGift(idx)
    };

    //______________________________________________________________________________

    //....Au clic dans un input de cadeau
    const handleInputClick = (clickedIndex) => {
        //....s'il y a bien un cadeau modifié (pas de cadeau = -1) ou qu'on clique
        //....ailleurs que dans un cadeau qui est déjà en cours de modification
        if (editingGift !== -1 && editingGift !== clickedIndex) {
            //....on ouvre la modale de validation d'enregistrement
            openModal()
        }
    }

    //______________________________________________________________________________

    //....Création d'un nouveau cadeau à partir des données envoyé par le petit enfant
    //....A revoir avec celui du dessous... doit pouvoir être fusionné
    const addNewGift = (newGiftData) => {
        // Créez un nouvel objet pour le nouveau cadeau
        const newGift = {
            title: newGiftData.title,
            detail: newGiftData.textInput,
            url: newGiftData.urlInput,
            offered: false,
            date: "2023-10-09",
        };

        //....Copie de l'état actuel des données
        const updatedDatas = [...datas];

        //....Identification des datas de l'utilisateur connecté
        const userIndex = updatedDatas.findIndex((data) => data.pseudo === "Armel");

        //....Vérification de l'existance de l'utilisateur (à vérifier... chatgpt)
        if (userIndex !== -1) {
            //....Ajout du nouveau cadeau aux données de cet utilisateur
            updatedDatas[userIndex].gifts.push(newGift);

            //....Mise jour l'état des données avec les nouvelles données
            setDatas(updatedDatas);
        }
    };

    //______________________________________________________________________________


    //....Enregistrement du cadeau volé
    const stolenGiftRegistered = (data) => {
        //....Récupération de l'utilisateur connecté
        const connectedUser = datas.find(user => user.pseudo === "Armel");
        //....Ajout du cadeau à l'utilisateur
        connectedUser.gifts.push(data);
        //....Affichage de la modale d'information
        setGiftSavedModalVisible(true);
    }

    const closeGiftSavedModal = () => {
        setGiftSavedModalVisible(false);
    };

    // //######################### JSX STOCKE DANS VARIABLES #######################

    // //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
    // //....création d'un composant user par donnée. Envoi dans le composant des
    // //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
    // //....modification d'un état utilisé par le composant, celui ci se mettra à jour
    // const connectedUserSection = datas
    //     .filter((data) => data.pseudo === "Armel")
    //     .map((data, i) => {
    //         const color = colors[0];
    //         return (
    //             //....composant user
    //             <UserConnectedGiftsContainer
    //                 //....clé unique obligatoire
    //                 key={-2}
    //                 //....background color
    //                 color={color}
    //                 //....statut depliage de la section
    //                 isExpanded={openedSectionUser}
    //                 //....fonction de dépliage de la section
    //                 onClick={() => handleUserSectionClick(i)}
    //                 //....fonction de dépliage de la section
    //                 onClickInput={(index) => handleInputClick(index)}
    //                 //....données
    //                 data={data}
    //                 //....
    //                 inputChangeInParent={handleInputChange}
    //                 //....fonction de gestion de changement des inputs
    //                 onInputChange={handleInputChange}
    //                 //....booléen cadeau en cours de modification
    //                 editingGift={editingGift}
    //                 //....statut de l'édition des inputs
    //                 inputDisabled={inputDisabled}
    //                 //....booléen réinitialisation des input si pas d'enregistrement dans modale
    //                 resetGift={resetGift}
    //                 //....fonction d'enregistrement
    //                 saveChanges={openModal}
    //                 //....fonction d'ajout de nouveau cadeau
    //                 addNewGift={addNewGift}

    //             />
    //         )
    //     })

    // //______________________________________________________________________________


    // //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
    // //....création d'un composant personne par donnée.
    // const personsSections = datas
    //     .filter((data) => data.pseudo !== "Armel")
    //     .map((data, i) => {
    //         const color = colors[colorNumber];
    //         colorNumber = colorNumber === colors.length - 1 ? 0 : colorNumber + 1;
    //         return (
    //             //....composants personnes
    //             <GiftsContainer
    //                 //....clé unique obligatoire
    //                 key={i}
    //                 //....background color
    //                 color={color}
    //                 //....statut depliage de la section (true si index stocké dans l'état)
    //                 isExpanded={openedSectionIndex === i}
    //                 //....fonction de dépliage de la section
    //                 onClick={() => handleSectionClick(i)}
    //                 //....données
    //                 data={data}
    //                 //....fonction de vol de cadau
    //                 onClickCartPlus={stolenGiftRegistered}

    //             />
    //         )
    //     })

    //############################## AFFICHAGE #################################

    return (
        <main>
            <div className={styles.orgContent}>

                {/* {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : ( */}
                <>
                {/* {giftsList2 && (<div>{giftsList2}</div>)} */}

                {personsSections && (<div><h3>courgette {personsSections[0]["login"]}</h3></div>)}
                    <div className={styles.firstSection}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        um voluptates a cumque velit
                    </div>
                    {/*...Affichage du jsx stocké dans la variable connectedUserSection */}
                    {connectedUserSection}

                    {/* Afficher la modale si elle est en statut ouverte */}
                    {modalOpen && modifiedData && (
                        <div className={styles.modal}>
                            <div className={styles.modalDialog}>
                                {/* <button className={styles.modalCloseButton} onClick={closeModal}></button> */}
                                <button onClick={handleSaveChanges}>On enregistre</button>
                                <button onClick={resetData}>On remet comme avant</button>
                            </div>
                        </div>
                    )}

                    {giftSavedModalVisible && (
                        <div className={styles.giftSavedModal}>
                            <p>Votre cadeau a été volé avec succès !</p>
                            <button onClick={closeGiftSavedModal}>Fermer</button>
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