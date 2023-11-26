import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faUser, faUnlock, faFileLines, faBullseye, faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons';

import ConnectionUser from './ConnectionUser';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateUserData, updateIdListe } from '../reducers/user'
import { useRouter } from 'next/router';
import { BACKEND_URL } from '@/utils/urls';
import { usersArray, chatArray } from '@/utils/datas';

//COMPOSANTS
import ChatContainer from "../components/ChatContainer";
import Header from '../components/smallElements/Header'
import ChatMessage from "../components/smallElements/ChatMessage";
import UserEmailNameOrMDPChange from "./smallElements/UserEmailNameOrMDPChange";
import UserPasswordRequest from "../components/smallElements/UserPasswordRequest";
import UserSantaClausLetter from "../components/smallElements/UserSantaClausLetter";
import UserGiftTarget from "../components/smallElements/UserGiftTarget";

//SERVICES
import ChatService from '../services/ChatService';
import ListesEtCadeauxService from '../services/ListesEtCadeauxService';
import TokenForUserService from '../services/TokenForUserService';
import UserInfosService from '../services/UserInfosService';

const moment = require('moment');
require('moment/locale/fr');

function HomePage() {

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

    //....Etat stockant les données des utilisateurs autre que le connecté
    const [giftsList2, setGiftsList2] = useState(null)

    //....Etat stockant les cadeaux non offerts de l'utilisateur
    const [noOfferedGifts, setNoOfferedGifts] = useState(null)

    //....Etat stockant les cadeaux offerts de l'utilisateur
    const [offeredGifts, setOfferedGifts] = useState(null)

    //....Etat stockant le JSX de la section utilisateur connecté
    const [connectedUserSection, setConnectedUserSection] = useState(null)

    //....Etat stockant le JSX des sections d'utilisateurs hors celui connecté
    const [personsSections, setPersonsSections] = useState(null)

    //....Etat stockant le name de connection
    const [signinName, setSigninName] = useState('');

    //....Etat stockant le cadeau en cours de modification à réinitialiser
    const [resetGift, setResetGift] = useState(-1);

    //....Etat permettant de détecter le changement de cadeau, pour réinitialisation du
    //....composant de l'utilisateur connecté
    const [orderChange, setOrderChange] = useState(1);

    //....Etat d'échec de connection
    const [errorLoginPass, setErrorLoginPass] = useState(false);

    //....Etat stockant les données de tchat
    const [tchatData, setTchatData] = useState('');

    //....Etat de gestion de l'input d'ajout de message dans le tchat
    const [tchatInput, setTchatInput] = useState('');

    //....Etat de gestion de l'ouverture ou fermeture de la modale de saisie 
    //....du message tchat du haut
    const [topTchatOpen, setTopTchatOpen] = useState(false);

    //....Etat de gestion de l'ouverture ou fermeture de la modale de saisie 
    //....du message tchat du bas
    const [bottomTchatOpen, setBottomTchatOpen] = useState(false);

    //....Etat de gestion de l'ouveture de la modale de changement de
    //....données utilisateur
    const [userDataChange, setUserDataChange] = useState('');

    //....Etat de gestion de l'ouverture/fermeture des icones de changements des user data
    const [dataUserIcons, setDataUserIcons] = useState(false);

    //....Etat de gestion de l'ouverture du textarea d'envoi de message secret
    const [openedSecretMessage, setOpenedSecretMessage] = useState("");

    //....Etat stockant le plus petit ordre de cadeau, utile pour la création de nouveaux cadeaux 
    const [lowestOrderGift, setLowestOrderGift] = useState(null);

    //....Etat stockant le cadeau ayant le plus grand id, utile pour la création de nouveaux cadeaux 
    const [greaterIdGift, setGreaterIdGift] = useState(null);

    const [editingMoveGift, setEditingMoveGift] = useState("");

    const user = useSelector((state) => state.user);
    const sizeOfWindow = useSelector((state) => state.windowSize);
    const dispatch = useDispatch();
    let colorNumber = 1;



    //....Couleurs des sections de personnes (blanc, jaune, rouge)
    const colors = ["#ffffff", "#e6bc14", "#f5363f"]

    const router = useRouter();

    const allDatas = usersArray;

    useEffect(() => {
        console.log("lancé");
        handleUserLogin();
    }, []);

    useEffect(() => {

        //######################### JSX STOCKE DANS VARIABLES #######################

        //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
        //....création d'un composant user par donnée. Envoi dans le composant des
        //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
        //....modification d'un état utilisé par le composant, celui ci se mettra à jour
        let connectedUserSectionMapping;

        if (noOfferedGifts) {

            connectedUserSectionMapping =
                // giftsConnectedUserList
                //....composant user
                <UserConnectedGiftsContainer
                    //....clé unique obligatoire
                    key={999997}
                    //....background color
                    color={colors[0]}
                    //....statut depliage de la section
                    isExpanded={openedSectionUser}
                    //....fonction de dépliage de la section
                    onClick={() => handleUserSectionClick(999997)}
                    //....fonction de dépliage de la section
                    onClickInput={(giftId) => handleInputClick(giftId)}
                    //....liste des cadeaux offerts
                    offeredGifts={offeredGifts}
                    //....liste des cadeaux non offerts
                    noOfferedGifts={noOfferedGifts}
                    //....fonction de gestion de changement des inputs
                    inputChangeInParent={(objectChange) => handleInputChange(objectChange)}
                    //....booléen cadeau en cours de modification
                    editingGift={editingGift}
                    //....statut de l'édition des inputs
                    inputDisabled={inputDisabled}
                    //....fonction d'enregistrement
                    openModalInHome={openSaveModal}
                    //....fonction d'ajout de nouveau cadeau
                    addNewGift={(newGift) => { setEditingGift(newGift.id), addNewGift(newGift) }}
                    //....id de la liste de l'utilisateur connecté
                    idListe={user.idListe}
                    //....fonction de mise à jour d'un cadeau, offert à false ou true
                    handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
                    //....fonction pour annuler l'enregistrement d'un cadeau en cas d'annulation
                    resetGift={resetGift}
                    //....fonction de mise en édition d'un cadeau
                    editingGiftToFalse={editingGiftToFalse}
                    //....fonction d'échange d'ordre d'un cadeau avec celui du haut
                    giftUp={(id) => swapOrderWithAbove(id)}
                    //....fonction d'échange d'ordre d'un cadeau avec celui du bas
                    giftDown={(id) => swapOrderWithBelow(id)}
                    //....indication de changement d'ordre pour déclenchement initialisation affichage
                    orderChange={orderChange}
                    //....plus petit ordre de tous les cadeaux
                    lowestOrderGift={lowestOrderGift}
                    //....indication de la modale en cours d'édition pour les user data
                    userDataChange={userDataChange}
                    //....mise en édition d'un cadau au clic sur édit
                    setEditingGift={(idNumber) => setEditingGift(idNumber)}

                    editingMoveGift={editingMoveGift}

                    greaterIdGift={greaterIdGift}

                    deleteGift={(id) => deleteGift(id)}


                />

        }

        //....Stockage du JSX
        setConnectedUserSection(connectedUserSectionMapping)

        //______________________________________________________________________________


        //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
        //....création d'un composant personne par donnée.
        let personsSectionsMapping;

        if (giftsList2) {

            personsSectionsMapping = giftsList2
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
                            //....fonction de vol de cadeau
                            onClickCartPlus={(dataGift) => handleSaveChanges(dataGift)}
                            // //....id de la liste de l'utilisateur connecté
                            // idListe={idConnectedUserList}
                            //....fonction de rerouting vers url
                            onUrlClick={(url) => handleUrlClick(url)}
                            //....indication pour ouverture de la modale de saisie d'un message secret
                            openedSecretMessage={openedSecretMessage === data.idUser}
                            //....fonction de changement d'ouverture/fermeture saisie d'un message secret
                            setOpenedSecretMessage={(value) => setOpenedSecretMessage(value)}
                            //....plus petit ordre de cadeau dans les cadeaux de l'utilisateur connecté
                            lowestOrderGift={lowestOrderGift}

                            greaterIdGift={greaterIdGift}
                        />
                    )
                })
            // Stockage du JSX de la section personnes autres que utilisateur connecté
            setPersonsSections(personsSectionsMapping)

        }

        setResetGift(-1)


    }, [giftsList2, offeredGifts, noOfferedGifts, user, openedSectionUser,
        openedSectionIndex, editingGift, orderChange, openedSecretMessage,
        editingMoveGift, user, lowestOrderGift, greaterIdGift]);

    //############################ FONCTIONS #################################


    const deleteGift = (giftId) => {
        setNoOfferedGifts((prevGifts) => prevGifts.filter((gift) => gift.id !== giftId));
    }

    //....Remettre tous les cadeaux en non édition
    //--------------------------------------------------------------------------
    const editingGiftToFalse = () => {
        setEditingGift(-1)
    }


    // Insertion du nouveau message dans le tchat
    //-------------------------------------------------------------------------
    const updateChatName = (oldName, newName) => {
        setTchatData((prevData) => {

            const newData = prevData.map((message) => {
                if (message.login === oldName) {
                    return { ...message, login: newName };
                }
                return message;
            });

            return newData;
        });
    };


    // Déclenchement de l'affichage de la page au clic sur lien d'URL
    //-------------------------------------------------------------------------

    const handleUrlClick = (url) => {
        console.log("Navigating to:", url);
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        window.open(url, "_blank");
    };


    // Connection / Récupération des données utilisateur / du tchat / des cadeaux
    //----------------------------------------------------------------------------


    const handleUserLogin = async () => {

        const logs = { name: "Testeur" };


        dispatch(login({
            token: "XXX",
        }));
        setSigninName(logs.name)

        const connectedUserInfos = (allDatas.filter((user) => user.pseudo === logs.name))[0]

        if (connectedUserInfos) {
            dispatch(updateUserData({
                name: logs.name,
                id: connectedUserInfos.idUser,
                cible: connectedUserInfos.cible,
                email: connectedUserInfos.email,
                enfant: !connectedUserInfos.isAdult,
                intro: connectedUserInfos.intro
            }));
        }

        dispatch(updateIdListe({
            idListe: connectedUserInfos.idListe,
        }));

        setTchatData(chatArray.sort((a, b) => a.date - b.date));

        const giftsResponse = usersArray;

        const allConnectedUserGifts = giftsResponse.filter((data) => data.pseudo.toLowerCase() === logs.name.toLowerCase())[0].gifts;

        const lowestOrder = allConnectedUserGifts.reduce((minOrder, currentGift) => {
            const currentOrder = Number(currentGift.Ordre);

            // Si minOrder est null ou le numéro d'ordre actuel est inférieur, mettez à jour minOrder
            return minOrder === null || currentOrder < minOrder ? currentOrder : minOrder;
        }, null);

        console.log(lowestOrder)

        const greaterId = allConnectedUserGifts.reduce((maxId, currentGift) => {
            const currentId = Number(currentGift.id);

            // Si maxId est null ou l'ID actuel est supérieur, mettez à jour maxId
            return maxId === null || currentId > maxId ? currentId : maxId;
        }, null);

        //Stockage du plus petit ordre de cadeau
        setLowestOrderGift(lowestOrder)
        //Stockage du cadeau avec le plus grand id
        setGreaterIdGift(greaterId)
        //Stockage des données des utilisateurs autres que celui connecté
        setGiftsList2(giftsResponse
            .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
            .filter((data) => data.pseudo.toLowerCase() !== logs.name.toLowerCase()));
        //Stockage des cadeaux non offerts de l'utilisateur connecté
        setNoOfferedGifts(allConnectedUserGifts.filter((data) => data.offered === false));
        console.log(allConnectedUserGifts.filter((data) => data.offered === true))

        //Stockage des cadeaux non offerts de l'utilisateur connecté
        setOfferedGifts(allConnectedUserGifts.filter((data) => data.offered === true));





        // try {
        //     // Récupération et stockage du token et name de l'utilisateur
        //     const tokenService = TokenForUserService();
        //     const tokenResponse = await tokenService.getTokenForUser(logs, setErrorLoginPass);

        //     if (tokenResponse.success) {
        //         setErrorLoginPass(false);
        //         const { token, name } = tokenResponse;
        //         dispatch(login({
        //             token: token,
        //             name: name
        //         }));
        //         setSigninName(name)

        //         // Récupération et stockage des informations personnelles de l'utilisateur
        //         const userInfoService = UserInfosService();
        //         const userInfoResponse = await userInfoService.getUserInfos(name, token);

        //         if (userInfoResponse.success) {
        //             const userData = userInfoResponse.userData;

        //             dispatch(updateUserData({
        //                 id: userData.id,
        //                 name: userData.login,
        //                 cible: userData.cible,
        //                 email: userData.email,
        //                 enfant: userData.enfant,
        //                 intro: userData.intro
        //             }));

        //             // Récupération et stockage des données du tchat
        //             const chatService = ChatService();
        //             const chatResponse = await chatService.getChatData(name, token)

        //             if (chatResponse.success) {
        //                 setTchatData(chatResponse.chat);

        //                 // Récupération et stockage des listes et cadeaux
        //                 const listesEtCadeauxService = ListesEtCadeauxService();
        //                 const giftsResponse = await listesEtCadeauxService.getListesEtCadeaux(name, token);

        //                 console.log(giftsResponse)

        //                 if (giftsResponse.success) {
        //                     const idListe = giftsResponse.gifts.filter((liste) => liste.pseudo === userData.login)[0].idListe

        //                     dispatch(updateIdListe({
        //                         idListe: idListe
        //                     }));
        //                     const allConnectedUserGifts = giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() === name.toLowerCase())[0].gifts;

        //                     const lowestOrder = allConnectedUserGifts.reduce((minGift, currentGift) => {
        //                         return !minGift || Number(currentGift.Ordre) < Number(minGift.Ordre) ? currentGift : minGift;
        //                     }, null);

        //                     //Stockage du plus petit ordre de cadeau
        //                     setLowestOrderGift(lowestOrder)
        //                     //Stockage des données des utilisateurs autres que celui connecté
        //                     setGiftsList2(giftsResponse.gifts
        //                         .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
        //                         .filter((data) => data.pseudo.toLowerCase() !== name.toLowerCase()));
        //                     //Stockage des cadeaux non offerts de l'utilisateur connecté
        //                     setNoOfferedGifts(allConnectedUserGifts.filter((data) => data.offered === false));
        //                     //Stockage des cadeaux non offerts de l'utilisateur connecté
        //                     setOfferedGifts(allConnectedUserGifts.filter((data) => data.offered === true));

        //                 } else { console.log("Erreur lors de la récupération des listes"); }

        //             } else { console.log("Erreur lors de la récupération du tchat"); }

        //         } else { console.log("Erreur lors de la récupération des informations utilisateur"); }

        //     } else {
        //         setErrorLoginPass(true);
        //         console.log("Erreur lors de la récupération du token");
        //     }
        // } catch (error) {
        //     console.error("Une erreur s'est produite lors de la connexion : ", error);
        // }
    };


    // Enregistrement d'un nouveau message dans le tchat
    //----------------------------------------------------------------------------

    const saveMessage = async () => {
        // const chatService = ChatService();

        // const result = await chatService.saveMessage(tchatInput, user)

        // if (result) {
        const date = new Date();
        const timestampInSeconds = Math.floor(date.getTime() / 1000);
        const newMessage = {
            date: timestampInSeconds,
            contenu: tchatInput,
            login: user.name
        }
        const updatedTchatData = [...tchatData];
        updatedTchatData.unshift(newMessage);
        setTchatData(updatedTchatData);
        setTopTchatOpen(false);
        setBottomTchatOpen(false);
        setTchatInput("");

        // }
    }

    // Fonction d'enregistrement en BDD du changement d'ordre de 2 cadeaux
    //--------------------------------------------------------------------------------

    const swapOrderInBdd = async (idRemplacant, idRemplace) => {

        try {
            const response = await fetch(`${BACKEND_URL}/api/changeOrdreCadeau`, {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": encodeURIComponent(user.name),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    IdRemplacant: idRemplacant,
                    IdRemplace: idRemplace,
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            return response.ok;
        } catch (error) {
            console.error("Erreur maj statut cadeau", error);
            throw error;
        }
    };

    // Gestion de récupération des données pour le changement d'ordre d'un cadeau avec 
    // celui du dessus
    //----------------------------------------------------------------------------------
    const swapOrderWithAbove = async (targetId) => {
        setEditingMoveGift(targetId)
        const sortNoOfferedGifts = noOfferedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre))
        const targetIndex = sortNoOfferedGifts
            .findIndex(gift => gift.id === targetId);

        if (targetIndex > 0) {
            const currentOrder = sortNoOfferedGifts[targetIndex].Ordre;
            const aboveOrder = sortNoOfferedGifts[targetIndex - 1].Ordre;
            const currentId = sortNoOfferedGifts[targetIndex].id;
            const aboveId = sortNoOfferedGifts[targetIndex - 1].id;

            // try {
            //     const result = await swapOrderInBdd(aboveId, currentId);
            //     console.log("swapOrderInBdd result:", result);

            //     if (result) {
            sortNoOfferedGifts[targetIndex].Ordre = aboveOrder;
            sortNoOfferedGifts[targetIndex - 1].Ordre = currentOrder;
            setNoOfferedGifts(sortNoOfferedGifts)
            setOrderChange(orderChange + 1);
            setEditingMoveGift("")

            //     } else {
            //         console.error("Échec de swapOrderInBdd. Résultat inattendu:", result);
            //     }
            // } catch (error) {
            //     console.error("Erreur lors de swapOrderInBdd:", error);
            // }
        }
    };

    // Gestion de récupération des données pour le changement d'ordre d'un cadeau avec 
    // celui du dessous
    //----------------------------------------------------------------------------------

    const swapOrderWithBelow = async (targetId) => {
        setEditingMoveGift(targetId)
        const sortNoOfferedGifts = noOfferedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre))
        const targetIndex = sortNoOfferedGifts
            .findIndex(gift => gift.id === targetId);

        if (targetIndex !== -1 && targetIndex < sortNoOfferedGifts.length - 1) {
            const currentOrder = sortNoOfferedGifts[targetIndex].Ordre;
            const belowOrder = sortNoOfferedGifts[targetIndex + 1].Ordre;
            const currentId = sortNoOfferedGifts[targetIndex].id;
            const belowId = sortNoOfferedGifts[targetIndex + 1].id;

            // try {
            //     const result = await swapOrderInBdd(currentId, belowId);
            //     console.log("swapOrderInBdd result:", result);

            //     if (result) {
            sortNoOfferedGifts[targetIndex].Ordre = belowOrder;
            sortNoOfferedGifts[targetIndex + 1].Ordre = currentOrder;
            setNoOfferedGifts(sortNoOfferedGifts)
            setOrderChange(orderChange + 1);
            setEditingMoveGift("")
            //     } else {
            //         console.error("Échec de swapOrderInBdd. Résultat inattendu:", result);
            //     }
            // } catch (error) {
            //     console.error("Erreur lors de swapOrderInBdd:", error);
            // }
        }
    };


    // Suppression du cadeau dans la liste en cas d'abandon de création d'un cadeau
    //----------------------------------------------------------------------------------

    const removeGiftById = (idToRemove) => {
        setNoOfferedGifts((prevNoOfferedGifts) => {
            const updatedNoOfferedGifts = prevNoOfferedGifts.filter((gift) => gift.id !== idToRemove);
            return updatedNoOfferedGifts;
        });
    };


    // Gestion de l'affichage des cadeaux lorsque deux ordres de cadeaux ont été échangés
    //------------------------------------------------------------------------------------

    const updateGiftsUserConnectedList = (giftId, offeredStatus) => {
        if (offeredStatus === false) {
            // Déplacer le cadeau de noOfferedGifts vers offeredGifts avec offered à true
            const movedGift = noOfferedGifts.find(gift => gift.id === giftId);
            const updatedNoOfferedGifts = noOfferedGifts.filter(gift => gift.id !== giftId);
            setNoOfferedGifts(updatedNoOfferedGifts);

            setOfferedGifts(prevOfferedGifts => [...prevOfferedGifts, { ...movedGift, offered: true }]);
        } else {
            // Déplacer le cadeau de offeredGifts vers noOfferedGifts avec offered à false
            const movedGift = offeredGifts.find(gift => gift.id === giftId);
            const updatedOfferedGifts = offeredGifts.filter(gift => gift.id !== giftId);
            setOfferedGifts(updatedOfferedGifts);

            setNoOfferedGifts(prevNoOfferedGifts => [...prevNoOfferedGifts, { ...movedGift, offered: false }]);
        }
    };


    // Fonction de changement de statut d'un cadeau, offert ou non offert
    //------------------------------------------------------------------------------------

    const handleOfferedClick = (index, idListe, offered) => {

        // fetch(`${BACKEND_URL}/api/euPasEuCadeau`, {
        //     method: 'PUT',
        //     headers: {
        //         "Noel-Token": user.token,
        //         "User-Name": encodeURIComponent(user.name),
        //         "App-Name": "NoelTan",
        //         "content-type": 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: index,
        //         idListe: idListe,
        //         eu: !offered
        //     })
        // })
        //     .then(response => response.text())
        //     .then(data => {
        // Mise à jour de l'affichage
        updateGiftsUserConnectedList(index, offered)

        // })
        // .catch(error => {
        //     console.log("Erreur maj statut cadeau", error);
        // });
    };

    // Ajout d'un nouveau cadeau dans le tableau local
    //------------------------------------------------------------------------------

    const addNewGift = (newGift) => {

        console.log(newGift)

        console.log(newGift)
        setNoOfferedGifts((prevNoOfferedGifts) => {

            const updatedNoOfferedGifts = [newGift, ...prevNoOfferedGifts];

            updatedNoOfferedGifts.sort((a, b) => a.Ordre - b.Ordre);

            return updatedNoOfferedGifts;
        });


        if (newGift.id === 999999) {
            setEditingGift(999999);
        }
    };


    //....Dépliage de la section personne si plié, pliage si déplié
    //----------------------------------------------------------------------------------

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


    //....Dépliage de l'user si plié, pliage si déplié
    //-------------------------------------------------------------------------------

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


    //.....Dépliage/pliage déclenché au click sur la section d'une personne 
    //-----------------------------------------------------------------------------------

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


    //.....Dépliage/pliage et ouverture modale déclenchée au click sur la section de l'user 
    //-----------------------------------------------------------------------------------

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


    //....Ouverture de la modale d'enregistrement
    //-----------------------------------------------------------------------------------

    const openSaveModal = () => {

        //....Ouverture de la modale grâce à l'état mis à true. 
        setModalOpen(true);

        //....Changement de l'état de modification, non autorisée, des inputs
        setInputDisabled(true);

    };


    //....Fermeture de la modale
    //-----------------------------------------------------------------------------------

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

        setOpenedSecretMessage("")


    };


    // Prise en compte pour l'affichage de la modification d'un cadeau
    //-----------------------------------------------------------------------------------

    // const localUpdateGift = (giftData) => {
    //     setNoOfferedGifts((prevGiftsList) => {
    //         // const filteredOrdreGifts = prevGiftsList.filter(
    //         //     (gift) => gift.Ordre !== 999999 && gift.Ordre !== 999998
    //         // );
    //         // const maxOrdre = Math.max(...filteredOrdreGifts.map((gift) => gift.Ordre), 0);

    //         // const filteredIdGifts = prevGiftsList.filter(
    //         //     (gift) => gift.Ordre !== 999999 && gift.Ordre !== 999998
    //         // );
    //         const maxId = Math.max(...prevGiftsList.map((gift) => gift.id), 0);

    //         const updatedGifts = prevGiftsList.map((gift) => {
    //             if (gift.id === giftData.giftKey) {
    //                 return {
    //                     ...gift,
    //                     id: giftData.giftKey === 999999 || giftData.giftKey === 999998 ? maxId + 1 : gift.id,
    //                     title: giftData.titleInput || giftData.title || gift.title,
    //                     detail: giftData.detailInput || giftData.detail || gift.detail,
    //                     url: giftData.urlInput || giftData.url || gift.url,
    //                     Ordre: giftData.ordre || giftData.Ordre
    //                 };
    //             }
    //             return gift;
    //         });

    //         updatedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre));

    //         setOrderChange(orderChange + 1)

    //         return updatedGifts;
    //     });
    // };


    //....Gestion de l'enregistrement des modifications depuis la modale
    //---------------------------------------------------------------------------------
    const handleSaveChanges = async (giftDatas) => {

        // try {
        if (giftDatas.id > greaterIdGift) {
            setNoOfferedGifts((prevGifts) => [...prevGifts, giftDatas]);
            setEditingGift(-1);
            setLowestOrderGift(giftDatas.Ordre);
            setGreaterIdGift(giftDatas.id);
            console.log(noOfferedGifts)
        }

        else {
            const updatedGifts = noOfferedGifts.map(gift => {
                if (gift.id === giftDatas.id) {
                    // Mise à jour individuelle des propriétés
                    return {
                        ...gift,
                        title: giftDatas.title !== undefined ? giftDatas.title : gift.title,
                        detail: giftDatas.detail !== undefined ? giftDatas.detail : gift.detail,
                        url: giftDatas.url !== undefined ? giftDatas.url : gift.url,
                    };
                }
                return gift;
            });

            console.log(updatedGifts)

            setNoOfferedGifts(updatedGifts);
            setModalOpen(false);
            setEditingGift(-1);
        }

        closeModal();


        // setLowestOrderGift(-1);
        // setEditingGift(-1);

        // if (giftDatas.giftKey === 999999 || giftDatas.giftKey === 999998) {
        // const response = await fetch(`${BACKEND_URL}/api/insertCadeau`, {
        //     method: 'POST',
        //     headers: {
        //         "Noel-Token": user.token,
        //         "User-Name": encodeURIComponent(user.name),
        //         "App-Name": "NoelTan",
        //         "content-type": 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idListe: giftDatas.idListe,
        //         title: giftDatas.titleInput ? giftDatas.titleInput : giftDatas.title ? giftDatas.title : "",
        //         detail: giftDatas.detailInput ? giftDatas.detailInput : giftDatas.detail ? giftDatas.detail : "",
        //         url: giftDatas.urlInput ? giftDatas.urlInput : giftDatas.url ? giftDatas.url : "",
        //     })
        // });

        // if (response.status === 200) {
        //     setErrorLoginPass(false);

        //     // Récupération et stockage des listes et cadeaux
        //     const listesEtCadeauxService = ListesEtCadeauxService();
        //     const giftsResponse = await listesEtCadeauxService.getListesEtCadeaux(user.name, user.token);

        //     if (giftsResponse.success) {
        // const allConnectedUserGifts = giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() === user.name.toLowerCase())[0].gifts;

        // const lowestOrder = allConnectedUserGifts.reduce((minGift, currentGift) => {
        //     return !minGift || Number(currentGift.Ordre) < Number(minGift.Ordre) ? currentGift : minGift;
        // }, null);

        // // Stockage du plus petit ordre de cadeau
        // setLowestOrderGift(lowestOrder);
        // // Stockage des cadeaux non offerts de l'utilisateur connecté
        // setNoOfferedGifts(allConnectedUserGifts.filter((data) => data.offered === false));

        // setEditingGift(-1);
        //     } else {
        //         console.log("Erreur lors de la récupération des listes");
        //     }
        // } else {
        //     setErrorLoginPass(true);
        //     throw new Error("Failed to save the gift. Status: " + response.status);
        // }
        //         } else {
        //             const response = await fetch(`${BACKEND_URL}/api/updateCadeau`, {
        //                 method: 'POST',
        //                 headers: {
        //                     "Noel-Token": user.token,
        //                     "User-Name": encodeURIComponent(user.name),
        //                     "App-Name": "NoelTan",
        //                     "content-type": 'application/json'
        //                 },
        //                 body: JSON.stringify({
        //                     id: giftDatas.giftKey,
        //                     title: giftDatas.titleInput ? giftDatas.titleInput : giftDatas.title ? giftDatas.title : "",
        //                     detail: giftDatas.detailInput ? giftDatas.detailInput : giftDatas.detail ? giftDatas.detail : "",
        //                     url: giftDatas.urlInput ? giftDatas.urlInput : giftDatas.url ? giftDatas.url : "",
        //                 })
        //             });

        //             if (response.status === 200) {
        //                 console.log("Reussi");
        //             } else {
        //                 setErrorLoginPass(true);
        //                 throw new Error("Failed to save the gift. Status: " + response.status);
        //             }
        //         }

        //         closeModal();
        //     } catch (error) {
        //         console.error("Erreur dans l'enregistrement", error);
        // }
    };


    //....Réinitialisation des données au clic sur annuler dans modale
    //-----------------------------------------------------------------------------------

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


    //....Fonction implémentée dans le composant UserConnectedGiftDetail, qui, se
    //....déclenche à chaque modification dans un input
    //-----------------------------------------------------------------------------------

    const handleInputChange = (modifiedDataFromChildren) => {

        setModifiedData(modifiedDataFromChildren)

        //....Initialisation de l'index du cadeau modifié
        const idx = modifiedDataFromChildren.giftKey;

        //....Mise à jour de l'état indiquant quel cadeau est en cours de modification
        setEditingGift(idx)

    };


    //....Mise en édition d'un cadau au clic dans un input de cadeau
    //-------------------------------------------------------------------------------

    const handleInputClick = (clickedIndex) => {


        //....s'il y a bien un cadeau modifié (pas de cadeau = -1) ou qu'on clique
        //....ailleurs que dans un cadeau qui est déjà en cours de modification
        if (editingGift !== -1 && editingGift !== clickedIndex) {
            //....on ouvre la modale de validation d'enregistrement
            openSaveModal()
        }
    }


    //....Fermeture de la modale d'enregistrement d'un cadeau
    //-------------------------------------------------------------------------------

    const closeGiftSavedModal = () => {
        setGiftSavedModalVisible(false);
    };




    //################################## AFFICHAGE #####################################

    return (
        <main>
            <Header
                openUserDataChange={() => setDataUserIcons(!dataUserIcons)} displayMenu={true} />


            {/* {signinName ? (<> */}
            <div className={styles.orgContent}>

                <div className={styles.userDataChangeContainer}>

                    {dataUserIcons && <div className={styles.userDataLogosContainer}>

                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faAt}
                            onClick={() => setUserDataChange(userDataChange === "email" ? "" : "email")}
                        />
                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faUser}
                            onClick={() => setUserDataChange(userDataChange === "name" ? "" : "name")}
                        />

                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faUnlock}
                            onClick={() => setUserDataChange(userDataChange === "password" ? "" : "password")}
                        />

                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faFileLines}
                            onClick={() => setUserDataChange(userDataChange === "letter" ? "" : "letter")}
                        />

                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faBullseye}
                            onClick={() => setUserDataChange(userDataChange === "target" ? "" : "target")}
                        />

                        <FontAwesomeIcon
                            className={styles.userDataIcon}
                            icon={faPersonThroughWindow}
                            onClick={() => window.location.reload()}
                        />
                    </div>}


                </div>

                {userDataChange === "email" &&
                    <UserEmailNameOrMDPChange
                        closeSection={() => setUserDataChange("")}
                        type={"email"} />}

                {userDataChange === "name" &&
                    <UserEmailNameOrMDPChange
                        closeSection={() => setUserDataChange("")}
                        type={"name"}
                        updateChatName={(oldName, newName) => updateChatName(oldName, newName)} />}

                {userDataChange === "password" &&
                    <UserEmailNameOrMDPChange
                        closeSection={() => setUserDataChange("")}
                        type={"password"} />
                }

                {userDataChange === "request" &&
                    <UserPasswordRequest
                        closeRequestSection={() => setUserDataChange("")} />
                }

                {userDataChange === "letter" &&
                    <UserSantaClausLetter
                        closeLetterSection={() => setUserDataChange("")} />
                }

                {userDataChange === "target" &&
                    <UserGiftTarget
                        closeTargetSection={() => setUserDataChange("")} />
                }

                {tchatData &&
                    <div className={styles.chatSection}>
                        {sizeOfWindow.width < 480
                            ? <p className={styles.firstChatTitle}>DERNIER MESSAGE</p> :
                            <p className={styles.firstChatTitle}>### DERNIER MESSAGE ###</p>
                        }


                        <p className={styles.firstChatContent}>De <span className={styles.firstChatName}>{tchatData[0].login}</span>  :
                            <span className={styles.firstChatText}> {tchatData[0].contenu} </span>
                        </p>
                        <p className={styles.firstChatDate}>({moment(tchatData[0].date * 1000).format("ddd DD/MM/YYYY à HH[h]mm")})</p>

                        <ChatMessage
                            tchatInput={tchatInput}
                            tchatOpen={topTchatOpen}
                            changeTchatInput={setTchatInput}
                            thisIsTop={true}
                            setTchatOpen={setTopTchatOpen}
                            saveMessage={saveMessage}
                        />

                    </div>

                }

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
            {tchatData &&
                <div id="chat" className={styles.chatContainer}>
                    <h1>Le chat de noël</h1>
                    <ChatMessage
                        tchatInput={tchatInput}
                        tchatOpen={bottomTchatOpen}
                        changeTchatInput={setTchatInput}
                        thisIsTop={false}
                        setTchatOpen={setBottomTchatOpen}
                        saveMessage={saveMessage}
                    />

                    <ChatContainer
                        messages={tchatData} />

                </div>
            }


            {/* </>) : (
                <ConnectionUser
                    onValidation={handleUserLogin}
                    errorLoginPass={errorLoginPass} />
            ) */}
            {/* } */}
        </main >

    );
}

export default HomePage;