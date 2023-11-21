import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'
import { useEffect } from 'react';
import ChatContainer from "../components/ChatContainer";
import ChatMessage from "../components/smallElements/ChatMessage";
import UserEmailNameOrMDPChange from "./smallElements/UserEmailNameOrMDPChange";
import UserPasswordRequest from "../components/smallElements/UserPasswordRequest";
import UserSantaClausLetter from "../components/smallElements/UserSantaClausLetter";
import UserGiftTarget from "../components/smallElements/UserGiftTarget";
import ConnectionUser from './ConnectionUser';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateUserData, updateIdListe } from '../reducers/user'
import { useRouter } from 'next/router';
import { faAt, faUser, faUnlock, faFileLines, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/smallElements/Header'
import ChatService from './services/ChatService';
import ListesEtCadeauxService from './services/ListesEtCadeauxService';
import TokenForUserService from './services/TokenForUserService';
import UserInfosService from './services/UserInfosService';

const moment = require('moment');

require('moment/locale/fr');


function HomePage() {

    const date = new Date();
    const timestampInSeconds = Math.floor(date.getTime() / 1000);

    let idConnectedUserList = 0;

    const router = useRouter();

    const user = useSelector((state) => state.user);
    const sizeOfWindow = useSelector((state) => state.windowSize);


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
    const [noOfferedGifts, setNoOfferedGifts] = useState(null)
    const [offeredGifts, setOfferedGifts] = useState(null)

    const [connectedUserSection, setConnectedUserSection] = useState(null)
    const [personsSections, setPersonsSections] = useState(null)

    // const router = useRouter();
    const dispatch = useDispatch();
    const [signinName, setSigninName] = useState('');
    const [errors, setErrors] = useState({});
    const [resetGift, setResetGift] = useState(-1);
    const [orderChange, setOrderChange] = useState(1);

    const [errorLoginPass, setErrorLoginPass] = useState(false);

    const [tchatData, setTchatData] = useState('');
    const [tchatInput, setTchatInput] = useState('');
    const [topTchatOpen, setTopTchatOpen] = useState(false);
    const [bottomTchatOpen, setBottomTchatOpen] = useState(false);

    const [userDataChange, setUserDataChange] = useState('');
    const [dataUserIcons, setDataUserIcons] = useState(false);
    const [openedSecretMessage, setOpenedSecretMessage] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // Mise à jour de l'interface utilisateur en réponse à tchatData
        // console.log('tchatData a changé :', tchatData);
        // Vous pouvez mettre à jour votre interface utilisateur ici
    }, [tchatData]);



    //########################################################################

    let colorNumber = 1;

    const updateChatName = (oldName, newName) => {
        setTchatData((prevData) => {
            // Créez une nouvelle copie en utilisant map pour éviter la mutation directe
            const newData = prevData.map((message) => {
                // Mettez à jour le login du message avec le nouveau nom
                if (message.login === oldName) {
                    return { ...message, login: newName };
                }
                return message;
            });

            // Retournez la nouvelle liste mise à jour
            return newData;
        });
    };

    // const updateConnectedUserName = (name) => {
    //     setGiftsConnectedUserList((prevList) => {
    //         // Créez une nouvelle copie en utilisant map pour éviter la mutation directe
    //         const newList = prevList.map((gift) => {
    //             // Mettez à jour le pseudo du premier élément avec le nouveau nom
    //             if (gift.pseudo === user.name) {
    //                 return { ...gift, pseudo: name };
    //             }
    //             return gift;
    //         });

    //         // Retournez la nouvelle liste mise à jour
    //         return newList;
    //     });
    // }

    const handleUrlClick = (url) => {
        console.log("Navigating to:", url);
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        window.open(url, "_blank");
    };

    const handleUserLogin = async (logs) => {
        try {
            // Step 1: Get token for user
            const tokenService = TokenForUserService();
            const tokenResponse = await tokenService.getTokenForUser(logs, setErrorLoginPass);

            if (tokenResponse.success) {
                setErrorLoginPass(false);
                const { token, name } = tokenResponse;
                dispatch(login({
                    token: token,
                    name: name
                }));
                setSigninName(name)

                console.log(token)

                // Step 2: Get user information
                const userInfoService = UserInfosService();
                const userInfoResponse = await userInfoService.getUserInfos(name, token);

                if (userInfoResponse.success) {
                    const userData = userInfoResponse.userData;

                    // Dispatch user data update
                    dispatch(updateUserData({
                        id: userData.id,
                        name: userData.login,
                        cible: userData.cible,
                        email: userData.email,
                        enfant: userData.enfant,
                        intro: userData.intro
                    }));

                    // Step 3: Get chat data
                    const chatService = ChatService();
                    const chatResponse = await chatService.getChatData(name, token)

                    if (chatResponse.success) {
                        // Set chat data state
                        setTchatData(chatResponse.chat);
                        // console.log(chatResponse.chat)

                        // Step 4: Get gifts data
                        const listesEtCadeauxService = ListesEtCadeauxService();
                        const giftsResponse = await listesEtCadeauxService.getListesEtCadeaux(logs, token);

                        if (giftsResponse.success) {
                            // console.log(giftsResponse.gifts)
                            const idListe = giftsResponse.gifts.filter((liste) => liste.pseudo === userData.login)[0].idListe
                            // {console.log(userData.login)}
                            // {console.log(idListe)}

                            // console.log(idListe)
                            dispatch(updateIdListe({
                                idListe: idListe
                            }));
                            // Set gifts data states
                            setGiftsList2(giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() !== name.toLowerCase()));
                            setGiftsConnectedUserList(giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() === name.toLowerCase()));
                            setNoOfferedGifts(giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() === name.toLowerCase())[0].gifts
                                // .sort((a, b) => a.Ordre - b.Ordre)
                                .filter((data) => data.offered === false));
                            setOfferedGifts(giftsResponse.gifts.filter((data) => data.pseudo.toLowerCase() === name.toLowerCase())[0].gifts
                                // .sort((a, b) => a.Ordre - b.Ordre)
                                .filter((data) => data.offered === true));
                            console.log(giftsResponse.gifts)

                        } else {
                            console.log("Erreur lors de la récupération des listes");
                        }
                    } else {
                        console.log("Erreur lors de la récupération du tchat");
                    }
                } else {
                    console.log("Erreur lors de la récupération des informations utilisateur");
                }
            } else {
                setErrorLoginPass(true);
                console.log("Erreur lors de la récupération du token");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la connexion : ", error);
        }
    };

    const saveMessage = async () => {
        const chatService = ChatService();

        const result = await chatService.saveMessage(tchatInput, user)
        if (result) {

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

        }
    }


    const swapOrderInBdd = async (idRemplacant, idRemplace) => {
        console.log("idRemplacant " + idRemplacant);
        console.log("idRemplace " + idRemplace);

        try {
            const response = await fetch("https://noel.helvie.fr/api/changeOrdreCadeau", {
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


    const swapOrderWithAbove = async (targetId) => {
        const sortNoOfferedGifts = noOfferedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre))
        const targetIndex = sortNoOfferedGifts
            .findIndex(gift => gift.id === targetId);

        if (targetIndex > 0) {
            const currentOrder = sortNoOfferedGifts[targetIndex].Ordre;
            const aboveOrder = sortNoOfferedGifts[targetIndex - 1].Ordre;
            const currentId = sortNoOfferedGifts[targetIndex].id;
            const aboveId = sortNoOfferedGifts[targetIndex - 1].id;

            try {
                const result = await swapOrderInBdd(aboveId, currentId);
                console.log("swapOrderInBdd result:", result);

                // Vérifier si le résultat est conforme à ce que tu attends
                if (result) {
                    sortNoOfferedGifts[targetIndex].Ordre = aboveOrder;
                    sortNoOfferedGifts[targetIndex - 1].Ordre = currentOrder;
                    setNoOfferedGifts(sortNoOfferedGifts)
                    setOrderChange(orderChange + 1);
                    // Autres opérations...
                } else {
                    console.error("Échec de swapOrderInBdd. Résultat inattendu:", result);
                    // Gérer l'erreur ici...
                }
            } catch (error) {
                console.error("Erreur lors de swapOrderInBdd:", error);
                // Gérer l'erreur ici...
            }
        }
    };

    const swapOrderWithBelow = async (targetId) => {
        const sortNoOfferedGifts = noOfferedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre))
        const targetIndex = sortNoOfferedGifts
            .findIndex(gift => gift.id === targetId);

        if (targetIndex !== -1 && targetIndex < sortNoOfferedGifts.length - 1) {
            const currentOrder = sortNoOfferedGifts[targetIndex].Ordre;
            const belowOrder = sortNoOfferedGifts[targetIndex + 1].Ordre;
            const currentId = sortNoOfferedGifts[targetIndex].id;
            const belowId = sortNoOfferedGifts[targetIndex + 1].id;

            try {
                const result = await swapOrderInBdd(currentId, belowId);
                console.log("swapOrderInBdd result:", result);

                // Vérifier si le résultat est conforme à ce que tu attends
                if (result) {
                    sortNoOfferedGifts[targetIndex].Ordre = belowOrder;
                    sortNoOfferedGifts[targetIndex + 1].Ordre = currentOrder;
                    setNoOfferedGifts(sortNoOfferedGifts)
                    setOrderChange(orderChange + 1);
                    // Autres opérations...
                } else {
                    console.error("Échec de swapOrderInBdd. Résultat inattendu:", result);
                    // Gérer l'erreur ici...
                }
            } catch (error) {
                console.error("Erreur lors de swapOrderInBdd:", error);
                // Gérer l'erreur ici...
            }
        }
    };

    const removeGiftById = (idToRemove) => {
        setNoOfferedGifts((prevNoOfferedGifts) => {
            const updatedNoOfferedGifts = prevNoOfferedGifts.filter((gift) => gift.id !== idToRemove);
            return updatedNoOfferedGifts;
        });
    };

    //.....couleurs des sections de personnes (jaune, vert, rose pâle)
    const colors = ["#ffffff", "#e6bc14", "#f5363f"]
    // , "#16ad66"

    const editingGiftToFalse = () => {
        setEditingGift(-1)
    }

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

    const handleOfferedClick = (index, idListe, offered) => {

        fetch("https://noel.helvie.fr/api/euPasEuCadeau", {
            method: 'PUT',
            headers: {
                "Noel-Token": user.token,
                "User-Name": encodeURIComponent(user.name),
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
                updateGiftsUserConnectedList(index, offered)

            })
            .catch(error => {
                console.log("Erreur maj statut cadeau", error);
            });
    };



    useEffect(() => {

        //######################### JSX STOCKE DANS VARIABLES #######################

        //....Création d'une variable, à partir des datas, filtrés juste sur l'utilisateur
        //....création d'un composant user par donnée. Envoi dans le composant des
        //....propriétés envoyées par celui-ci. (variables ou fonctions) A chaque
        //....modification d'un état utilisé par le composant, celui ci se mettra à jour
        let connectedUserSectionMapping;

        if (offeredGifts) {

            const allGifts = [...noOfferedGifts, ...offeredGifts];

            const lowestOrderGift = allGifts.reduce((minGift, currentGift) => {
                return !minGift || Number(currentGift.Ordre) < Number(minGift.Ordre) ? currentGift : minGift;
            }, null);

            // const lowestOrderGift = noOfferedGifts
            //     .reduce((minGift, currentGift) => {
            //         return !minGift || Number(currentGift.Ordre) < Number(minGift.Ordre) ? currentGift : minGift;
            //     }, null);


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
                    //....données
                    // data={data}
                    offeredGifts={offeredGifts}
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
                    addNewGift={(newGift) => addNewGift(newGift)}

                    idListe={user.idListe}

                    handleOfferedClick={(index, idListe, offered) => handleOfferedClick(index, idListe, offered)}
                    resetGift={resetGift}
                    editingGiftToFalse={editingGiftToFalse}
                    giftUp={(id) => swapOrderWithAbove(id)}
                    giftDown={(id) => swapOrderWithBelow(id)}
                    orderChange={orderChange}

                    lowestOrderGift={lowestOrderGift.Ordre}
                />

        }

        setConnectedUserSection(connectedUserSectionMapping)

        //______________________________________________________________________________


        //....Création d'une variable, à partir des datas, filtrés, tous sauf l'utilisateur
        //....création d'un composant personne par donnée.
        let personsSectionsMapping;

        if (giftsList2) {

            const lowestOrderGift = noOfferedGifts
                .reduce((minGift, currentGift) => {
                    return !minGift || Number(currentGift.Ordre) < Number(minGift.Ordre) ? currentGift : minGift;
                }, null);

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

                            onUrlClick={(url) => handleUrlClick(url)}

                            openedSecretMessage={openedSecretMessage === data.idUser}
                            // openedSantaClausSecretMessage={openedSantaClausSecretMessage===data.id}
                            // openedPersonSecretMessage={openedPersonSecretMessage===data.id}
                            setOpenedSecretMessage={(value) => setOpenedSecretMessage(value)}
                            // setOpenedSantaClausSecretMessage={(value)=>setOpenedSantaClausSecretMessage(value)}
                            // setOpenedPersonSecretMessage={(value)=>setOpenedPersonSecretMessage(value)}
                            lowestOrderGift={lowestOrderGift.Ordre}


                        />
                    )
                })
            setPersonsSections(personsSectionsMapping)

        }
        setResetGift(-1)


    }, [giftsList2, offeredGifts, noOfferedGifts, openedSectionUser,
        openedSectionIndex, editingGift, user, orderChange, openedSecretMessage]);




    //############################ FONCTIONS #################################

    const addNewGift = (newGift) => {
        console.log(newGift)
        setNoOfferedGifts((prevNoOfferedGifts) => {
            // Mettez à jour le tableau de cadeaux
            const updatedNoOfferedGifts = [newGift, ...prevNoOfferedGifts];

            // Retournez une nouvelle liste avec le tableau de cadeaux mis à jour
            return updatedNoOfferedGifts;
        });

        if (newGift.id === 999999) {
            setEditingGift(999999);
        }
    };

    // const addNewGift = (newGift) => {

    //     // console.log(newGift)



    //     setGiftsConnectedUserList((prevState) => {


    //         // Vérifiez si le tableau de cadeaux existe dans l'objet
    //         const giftsArray = prevState.length > 0 ? prevState[0].gifts : [];

    //         // Mettez à jour le tableau de cadeaux de cet utilisateur
    //         const updatedGifts = [newGift, ...giftsArray];

    //         // Retournez une nouvelle liste avec le tableau de cadeaux mis à jour
    //         return [{ ...prevState[0], gifts: updatedGifts }];
    //     });

    //     if (newGift.id === 999999) {

    //         setEditingGift(999999)

    //     }
    // };

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

        setOpenedSecretMessage("")


    };

    const localUpdateGift = (giftData) => {
        setNoOfferedGifts((prevGiftsList) => {
            const filteredOrdreGifts = prevGiftsList.filter(
                (gift) => gift.Ordre !== 999999 && gift.Ordre !== 999998
            );
            const maxOrdre = Math.max(...filteredOrdreGifts.map((gift) => gift.Ordre), 0);
    
            const filteredIdGifts = prevGiftsList.filter(
                (gift) => gift.Ordre !== 999999 && gift.Ordre !== 999998
            );
            const maxId = Math.max(...filteredIdGifts.map((gift) => gift.id), 0);
    
            const updatedGifts = prevGiftsList.map((gift) => {
                if (gift.id === giftData.giftKey) {
                    return {
                        ...gift,
                        id: giftData.giftKey === 999999 || giftData.giftKey === 999998 ? maxId + 1 : gift.id,
                        title: giftData.titleInput || giftData.title || gift.title,
                        detail: giftData.detailInput || giftData.detail || gift.detail,
                        url: giftData.urlInput || giftData.url || gift.url,
                        Ordre: giftData.ordre
                    };
                }
                return gift;
            });
    
            // Trier le tableau mis à jour en fonction de la propriété Ordre
            updatedGifts.sort((a, b) => Number(a.Ordre) - Number(b.Ordre));

            setOrderChange(orderChange+1)
    
            return updatedGifts;
        });
    };
    //______________________________________________________________________________

    //....Gestion de l'enregistrement des modifications depuis la modale
    const handleSaveChanges = (giftDatas) => {
        const giftOrdre = giftDatas.ordre ? giftDatas.ordre : "";
        if (giftDatas.giftKey === 999999 || giftDatas.giftKey === 999998) {

            fetch("https://noel.helvie.fr/api/insertCadeau", {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": encodeURIComponent(user.name),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },

                body: JSON.stringify({
                    idListe: giftDatas.idListe,
                    title: giftDatas.titleInput ? giftDatas.titleInput : giftDatas.title ? giftDatas.title : "",
                    detail: giftDatas.detailInput ? giftDatas.detailInput : giftDatas.detail ? giftDatas.detail : "",
                    url: giftDatas.urlInput ? giftDatas.urlInput : giftDatas.url ? giftDatas.url : "",
                    ordre: giftOrdre
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        setErrorLoginPass(false)
                        setEditingGift("")
                        if (giftDatas.giftKey === 999998) {
                            setGiftSavedModalVisible(true);
                            addNewGift(giftDatas)
                        }
                        localUpdateGift(giftDatas);

                        return response.text();

                    } else {

                        setErrorLoginPass(true)
                        throw new Error("Failed save the gift. Status: " + response.status);
}

                })

        }
        else {

            fetch("https://noel.helvie.fr/api/updateCadeau", {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": encodeURIComponent(user.name),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    id: giftDatas.giftKey,
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


    const closeGiftSavedModal = () => {
        setGiftSavedModalVisible(false);
    };

    //############################## AFFICHAGE #################################

    return (
        <main>
            <Header
                openUserDataChange={() => setDataUserIcons(!dataUserIcons)} />


            {/* {signinName ? (<> */}



            {signinName ? (<>
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
                        </div>}


                    </div>

                    {userDataChange === "email" && <UserEmailNameOrMDPChange closeSection={() => setUserDataChange("")} type={"email"} />}
                    {userDataChange === "name" && <UserEmailNameOrMDPChange closeSection={() => setUserDataChange("")} type={"name"} updateName={(name) => updateConnectedUserName(name)} updateChatName={(oldName, newName) => updateChatName(oldName, newName)} />}
                    {userDataChange === "password" && <UserEmailNameOrMDPChange closeSection={() => setUserDataChange("")} type={"password"} />}
                    {userDataChange === "request" && <UserPasswordRequest closeRequestSection={() => setUserDataChange("")} />}
                    {userDataChange === "letter" && <UserSantaClausLetter closeLetterSection={() => setUserDataChange("")} />}
                    {userDataChange === "target" && <UserGiftTarget closeTargetSection={() => setUserDataChange("")} />}


                    {/* {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : ( */}

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

                        <ChatContainer messages={tchatData} />

                    </div>
                }


            </>) : (
                <ConnectionUser onValidation={handleUserLogin} errorLoginPass={errorLoginPass} />
            )}
        </main >

    );
}

export default HomePage;