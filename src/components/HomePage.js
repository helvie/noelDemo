import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'
import { useEffect } from 'react';
import { envVariables } from '../../env';
import { chatConversation } from '@/utils/chatConversation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEye } from '@fortawesome/free-solid-svg-icons';
import ChatContainer from "../components/ChatContainer";
import ConnectionUser from './ConnectionUser';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../reducers/user'
const moment = require('moment');
require('moment/locale/fr');

function HomePage() {

    let idConnectedUserList = 0;


    const user = useSelector((state) => state.user);
    const sizeOfWindow = useSelector((state) => state.windowSize);

    const firstMessageDate = moment(chatConversation[0].datetime);

    //############################### ETATS #################################

    //.....Etat gérant le dépliage des sections autres que celle de l'user
    const [openedSectionIndex, setOpenedSectionIndex] = useState(null);

    //.....Etat gérant le dépliage de la section de l'user
    const [openedSectionUser, setOpenedSectionUser] = useState(false);

    //....Etat stockant le cadeau en cours de modification
    const [editingGift, setEditingGift] = useState(-1);

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
    const [giftsConnectedUserList, setGiftsConnectedUserList] = useState(null)
    const [giftsList2, setGiftsList2] = useState(null)
    const [connectedUserSection, setConnectedUserSection] = useState(null)
    const [personsSections, setPersonsSections] = useState(null)

    // const router = useRouter();
    const dispatch = useDispatch();
    const [signinName, setSigninName] = useState('');
    const [errors, setErrors] = useState({});
    const [resetGift, setResetGift] = useState(-1);

    const [errorLoginPass, setErrorLoginPass] = useState(null);



    //########################################################################

    let colorNumber = 1;


    const removeGiftById = (idToRemove) => {
        setGiftsConnectedUserList((prevList) => {
          // Vérifiez si prevList est non vide et si gifts est défini
          if (prevList.length > 0 && prevList[0].gifts) {
            const updatedGifts = prevList[0].gifts.filter((gift) => gift.id !== idToRemove);
            return [{ ...prevList[0], gifts: updatedGifts }];
          }
      
          return prevList;
        });
      };

    //.....couleurs des sections de personnes (jaune, vert, rose pâle)
    const colors = ["#e6bc14", "#ffffff", "#e62530"]
    // , "#16ad66"


    const editingGiftToFalse = () => {
        setEditingGift(-1)
    }


    const updateGiftsUserConnectedList = (giftListId, giftId, offeredStatus) => {

        // Utilisez map pour créer une nouvelle copie avec les modifications nécessaires
        const updatedGiftsUserConnectedList = giftsConnectedUserList.map(giftList => {
            // Vérifiez d'abord si listId correspond
            if (giftList.idListe === giftListId) {
                // Ensuite, mappez sur les cadeaux de cette liste
                const updatedGifts = giftList.gifts.map(gift => {
                    // Ensuite, vérifiez si giftId correspond
                    if (gift.id === giftId) {
                        // Mettez à jour le statut uniquement si giftId est égal à 200
                        return { ...gift, offered: offeredStatus };
                    }
                    // Si ce n'est pas le cadeau avec giftId 200, retournez-le tel quel
                    return gift;
                });

                // Retournez la liste mise à jour avec les cadeaux modifiés
                return { ...giftList, gifts: updatedGifts };
            }

            // Si ce n'est pas la liste avec listId correspondant, retournez-la telle quelle
            return giftList;
        });

        // Mettez à jour l'état avec la nouvelle copie
        setGiftsConnectedUserList(updatedGiftsUserConnectedList);
    };



    const handleOfferedClick = (index, idListe, offered) => {

        fetch("https://noel.helvie.fr/api/euPasEuCadeau", {
            method: 'PUT',
            headers: {
                "Noel-Token": user.token,
                "User-Name": user.name,
                "App-Name": "NoelTan",
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                id: index,
                idListe: idListe,
                eu: !offered
            })
        })
            .then(response => response.text())
            .then(data => {
                updateGiftsUserConnectedList(idListe, index, !offered)

            })
            .catch(error => {
                console.log("Erreur maj statut cadeau", error);
            });
    };

    const handleUserLogin = (logs) => {


        fetch("https://noel.helvie.fr/api/gettokenforuser.php", {

            method: 'POST',
            headers: {

                "App-Name": envVariables.AppName,
                "App-Key": envVariables.AppKey,
                "content-type": 'application/json'
            },

            body: JSON.stringify({
                login: logs.signinName,
                mdp: logs.signinPassword

            })

        })
            // .then(response => response.text())
            .then(response => {
                if (response.status === 200) {
                    setErrorLoginPass(false)
                    return response.text();
                } else {
                    setErrorLoginPass(true)
                    throw new Error("Failed to get token. Status: " + response.status);
                }
            })
            .then(tokenData => {
                setSigninName(logs.signinName);
                dispatch(login({
                    name: logs.signinName,
                    token: tokenData
                }))


                fetch("https://noel.helvie.fr/api/getlistesetcadeaux.php", {

                    headers: {

                        "user-name": logs.signinName,
                        "app-name": "NoelTan",
                        "noel-token": tokenData // Utilisez la variable renommée ici
                    }

                })

                    .then(response => response.json())
                    .then(giftsData => { // Renommez la variable ici

                        setGiftsList2(giftsData.filter((data) => data.pseudo.toLowerCase() !== logs.signinName.toLowerCase()));
                        setGiftsConnectedUserList(giftsData.filter((data) => data.pseudo.toLowerCase() === logs.signinName.toLowerCase()));
                    })

                    .catch(error => {

                        console.log("Erreur lors de la récupération des listes");

                    });


            })

            .catch(error => {

                console.log("Erreur lors de la récupération du token");

            });

    }


    useEffect(() => {

        //######################### JSX STOCKE DANS VARIABLES #######################

        //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
        //....création d'un composant user par donnée. Envoi dans le composant des
        //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
        //....modification d'un état utilisé par le composant, celui ci se mettra à jour
        let connectedUserSectionMapping;

        if (giftsConnectedUserList) {

            connectedUserSectionMapping = giftsConnectedUserList
                .map((data, i) => {
                    idConnectedUserList = data.idListe;
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
                            onClickInput={(giftId) => handleInputClick(giftId)}
                            //....données
                            data={data}
                            //....fonction de gestion de changement des inputs
                            inputChangeInParent={(objectChange) => handleInputChange(objectChange)}
                            //....booléen cadeau en cours de modification
                            editingGift={editingGift}
                            //....statut de l'édition des inputs
                            inputDisabled={inputDisabled}
                            //....fonction d'enregistrement
                            openModalInHome={openSaveModal}
                            //....fonction d'ajout de nouveau cadeau
                            addNewGift={(newGift) => addNewGift(newGift)}

                            idListe={data.idListe}

                            handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
                            resetGift={resetGift}
                            editingGiftToFalse={editingGiftToFalse}


                        />
                    )
                })
        }

        setConnectedUserSection(connectedUserSectionMapping)

        //______________________________________________________________________________


        //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
        //....création d'un composant personne par donnée.
        let personsSectionsMapping;

        if (giftsList2) {
            personsSectionsMapping = giftsList2
                // .filter((data) => data.pseudo.toLowerCase() !== signinName.toLowerCase())
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
                            onClickCartPlus={(dataGift) => handleSaveChanges(dataGift)}

                            idListe={idConnectedUserList}
                        />
                    )
                })
            setPersonsSections(personsSectionsMapping)

        }
        setResetGift(-1)


    }, [giftsList2, giftsConnectedUserList, openedSectionUser, openedSectionIndex, editingGift, user]);




    //############################ FONCTIONS #################################



    const addNewGift = (newGift) => {



        setGiftsConnectedUserList((prevState) => {


            // Vérifiez si le tableau de cadeaux existe dans l'objet
            const giftsArray = prevState.length > 0 ? prevState[0].gifts : [];

            // Mettez à jour le tableau de cadeaux de cet utilisateur
            const updatedGifts = [newGift, ...giftsArray];

            // Retournez une nouvelle liste avec le tableau de cadeaux mis à jour
            return [{ ...prevState[0], gifts: updatedGifts }];
        });

        if (newGift.id === 999999) {

            setEditingGift(999999)

        }
    };

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

        //....si la section de l'user est ouverte, indication que la modale est ouverte
        //....au clic sur une section (et non sur un input)
        openedSectionUser ? setModalOpenFromHome(true) : null

        //....si un cadeau est en édition
        if (editingGift !== -1) {

            //....ouverture de la modale d'enregistrement
            openSaveModal()

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
            openSaveModal()

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
    const openSaveModal = () => {

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

    const localUpdateGift = (giftData) => {
        setGiftsConnectedUserList(prevGiftsList => {

            const filteredOrdreGifts = prevGiftsList[0].gifts.filter(gift => gift.Ordre !== 999999 && gift.Ordre !== 999998);
            const maxOrdre = Math.max(...filteredOrdreGifts.map(gift => gift.Ordre), 0);

            const filteredIdGifts = prevGiftsList[0].gifts.filter(gift => gift.Ordre !== 999999 && gift.Ordre !== 999998);
            const maxId = Math.max(...filteredIdGifts.map(gift => gift.id), 0);

            const updatedGifts = prevGiftsList[0].gifts.map(gift => {
                if (gift.id === giftData.giftKey) {
                    return {
                        ...gift,
                        id: giftData.giftKey === 999999 || giftData.giftKey === 999998 ? maxId + 1 : gift.id,
                        Ordre: giftData.giftKey === 999999 || giftData.giftKey === 999998 ? maxOrdre + 1 : gift.ordre,
                        title: giftData.titleInput || giftData.title || gift.title,
                        detail: giftData.detailInput || giftData.detail || gift.detail,
                        url: giftData.urlInput || giftData.url || gift.url
                    };
                }
                return gift;
            });

            return [{ ...prevGiftsList[0], gifts: updatedGifts }];
        });
    }

    //______________________________________________________________________________

    //....Gestion de l'enregistrement des modifications depuis la modale
    const handleSaveChanges = (giftDatas) => {

        if (giftDatas.giftKey === 999999 || giftDatas.giftKey === 999998) {

            fetch("https://noel.helvie.fr/api/insertCadeau", {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": user.name,
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    idListe: giftDatas.idListe,
                    title: giftDatas.titleInput ? giftDatas.titleInput : giftDatas.title ? giftDatas.title : "",
                    detail: giftDatas.detailInput ? giftDatas.detailInput : giftDatas.detail ? giftDatas.detail : "",
                    url: giftDatas.urlInput ? giftDatas.urlInput : giftDatas.url ? giftDatas.url : "",
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        setErrorLoginPass(false)
                        if (giftDatas.giftKey === 999998) {
                            setGiftSavedModalVisible(true);
                            addNewGift(giftDatas)
                        }
                        return response.text();

                    } else {
                        setErrorLoginPass(true)
                        throw new Error("Failed save the gift. Status: " + response.status);
                    }
                })
                .then(data => {
                    localUpdateGift(giftDatas);
                })
                .catch(error => {
                    console.log("Erreur dans l'enregistrement", error);
                })
        }
        else {

            fetch("https://noel.helvie.fr/api/updateCadeau", {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": user.name,
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    idListe: giftDatas.idListe,
                    title: giftDatas.titleInput ? giftDatas.titleInput : giftDatas.title ? giftDatas.title : "",
                    detail: giftDatas.detailInput ? giftDatas.detailInput : giftDatas.detail ? giftDatas.detail : "",
                    url: giftDatas.urlInput ? giftDatas.urlInput : giftDatas.url ? giftDatas.url : "",
                })
            })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        return response.text();
                    } else {
                        setErrorLoginPass(true)
                        throw new Error("Failed save the gift. Status: " + response.status);
                    }
                })
                .then(data => {
                    console.log("reussi")
                })
                .catch(error => {
                    console.log("Erreur dans l'enregistrement", error);
                })
        }



        closeModal();
    };

    //______________________________________________________________________________

    //....Réinitialisation des données au clic sur annuler dans modale
    const resetData = () => {

        setResetGift(editingGift)

        removeGiftById(999999)


        //....Indication dans l'état qu'aucun cadeau n'est en cours de modification
        setEditingGift(-1)

        //....Indication dans l'état qu'aucun cadeau n'est en cours de modification
        setModalOpenFromHome(false)




        //....Fermeture de la modale
        closeModal();
    };
    //______________________________________________________________________________

    //....Fonction implémentée dans le composant UserConnectedGiftDetail, qui, se
    //....déclenche à chaque modification dans un input
    const handleInputChange = (modifiedDataFromChildren) => {

        setModifiedData(modifiedDataFromChildren)

        //....Initialisation de l'index du cadeau modifié
        const idx = modifiedDataFromChildren.giftKey;

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
            openSaveModal()
        }
    }

    //______________________________________________________________________________


    // //....Enregistrement du cadeau volé
    // const stolenGiftRegistered = (giftData) => {
    //     setGiftsConnectedUserList(prevList => {
    //       const updatedList = [...prevList]; // Copie de la liste existante
    //       updatedList[0].gifts = [...prevList[0].gifts, giftData]; // Mise à jour du tableau gifts
    //       return updatedList;
    //     });        
    //   }

    const closeGiftSavedModal = () => {
        setGiftSavedModalVisible(false);
    };

    //############################## AFFICHAGE #################################

    return (
        <main>
            {signinName ? (<>
                <div className={styles.orgContent}>

                    {/* {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : ( */}

                    <div className={styles.chatSection}>
                        {sizeOfWindow.width < 480
                            ? <p className={styles.firstChatTitle}>DERNIER MESSAGE</p> :
                            <p className={styles.firstChatTitle}>### DERNIER MESSAGE ###</p>
                        }

                        <p className={styles.firstChatContent}>De <span className={styles.firstChatName}>{chatConversation[0].sender}</span>  :
                            <span className={styles.firstChatText}> {chatConversation[0].text} </span>
                            <span className={styles.firstChatDate}>({firstMessageDate.format("ddd DD/MM/YYYY à HH[h]mm")})</span></p>
                        <FontAwesomeIcon
                            className={styles.giftChatIcon}
                            icon={faCommentDots}
                        // onClick={handleCartPlusClick} 
                        />
                        <a href="#chat" className={styles.giftChatIconLink}>
                            <FontAwesomeIcon
                                className={styles.giftChatIcon}
                                icon={faEye}
                            />
                        </a>

                        {/* <a href="#présentationSection" onClick={(e) => scrollToSection(e, 'presentationSection')}>Présentation</a> */}
                    </div>

                    {/*...Affichage du jsx stocké dans la variable connectedUserSection */}
                    {connectedUserSection}

                    {/* Afficher la modale si elle est en statut ouverte */}
                    {modalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modalDialog}>
                                {/* <button className={styles.modalCloseButton} onClick={closeModal}></button> */}
                                <button onClick={() => handleSaveChanges(modifiedData)}>Sûr.e de vouloir enregistrer !!!</button>
                                <button onClick={resetData}>Bof, on remet comme avant</button>
                            </div>
                        </div>
                    )}

                    {giftSavedModalVisible && (
                        <div className={styles.giftSavedModal}>
                            <p style={{ color: "red" }}>Votre cadeau a été volé avec succès !</p>
                            <button onClick={closeGiftSavedModal}>Fermer</button>
                        </div>
                    )}

                    {/*...Affichage des divs stockées dans la variable personsSections */}
                    {personsSections}


                    {/* )} */}
                </div>
                <ChatContainer messages={chatConversation} />


            </>) : (
                <ConnectionUser onValidation={handleUserLogin} errorLoginPass={errorLoginPass} />
            )}
        </main >

    );
}

export default HomePage;