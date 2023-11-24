import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faLink, faMessage } from '@fortawesome/free-solid-svg-icons';
import GiftDetail from './GiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';
import SectionNameSeparation from './smallElements/SectionNameSeparation';
import SendMail from './smallElements/SendMail';
import { useSelector } from 'react-redux';
//______________________________________________________________________________

function GiftsContainer(props) {

    const user = useSelector((state) => state.user);


    function decodeCaracteresSpeciaux(chaine) {
        return chaine.replace(/&eacute;/g, "é")
            .replace(/&egrave;/g, "è")
            .replace(/&ecirc;/g, "ê")
            .replace(/&euml;/g, "ë")
            .replace(/&agrave;/g, "à")
            .replace(/&acirc;/g, "â")
            .replace(/&iuml;/g, "ï")
            .replace(/&ouml;/g, "ö")
            .replace(/&ucirc;/g, "û")
            .replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"');
    }

    let giftsList = "";
    let nbGifts = 0;

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        onClick,
        isExpanded,
        onClickCartPlus,
        color,
        onUrlClick,
        openedSecretMessage,
        setOpenedSecretMessage,
        lowestOrderGift
    } = props;

    const idListe = user.idListe;

    //______________________________________________________________________________


    //....Etat de gestion de l'affichage ou masquage des détails du cadeau
    const [openedDetailIndex, setOpenedDetailIndex] = useState(false);
    const [openedSantaClausSecretMessage, setOpenedSantaClausSecretMessage] = useState(false);
    const [openedPersonSecretMessage, setOpenedPersonSecretMessage] = useState(false);


    //....Fonction déclenchant l'affichage ou masquage des détails du cadeau
    const handleGiftClick = (index) => {
        //....Si la section est ouverte on met son statut à null pour la fermer
        if (openedDetailIndex === index) {
            setOpenedDetailIndex(null);
        } else {
            // Sinon, on stocke l'index du cadeau pour déclencher l'affichage
            setOpenedDetailIndex(index);
        }
    };

    const openSecretMessage = (recipient) => {
        recipient === "santaClaus" ?
            (setOpenedPersonSecretMessage(false), setOpenedSantaClausSecretMessage(true)) :
            recipient === "person" ?
                (setOpenedPersonSecretMessage(true), setOpenedSantaClausSecretMessage(false)) :
                null
    }

    const closeMailSend = () => {
        setOpenedSantaClausSecretMessage(false)
        setOpenedPersonSecretMessage(false)
    }


    //______________________________________________________________________________

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    if (data.gifts) {

        { nbGifts = data.gifts ? data.gifts.filter(gift => !gift.offered).length : 0 }

        giftsList = data.gifts.filter(gift => gift.offered === false).map((data, index) => (
            //....récupérés du tableau de données tableau de données
            //....un composant par cadeau



            <div className={styles.gift} key={index}>
                <GiftDetail
                    //....clé obligatoire
                    key={data.id}
                    //....index du cadeau
                    index={data.id}
                    //....statut de l'affichage des détail
                    isExpanded={openedDetailIndex === index}
                    //....fonction de clic sur le plus ou moins pour affichage détail
                    onClick={() => handleGiftClick(index)}
                    //....données
                    data={data}

                    idListe={idListe}
                    //....fonction de vol de cadeau
                    onClickCartPlus={(giftData) => onClickCartPlus(giftData)}

                    onUrlClick={(url) => onUrlClick(url)}

                    lowestOrderGift={lowestOrderGift}

                />
            </div>
        ))
    }
    else {
        nbGifts = 0;
        giftsList = null
    };

    //______________________________________________________________________________

    //....Affichage
    return (
        <>



            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: color }}>
                <p className={styles.pseudo}>{data.pseudo}
                    <span className={styles.nbGifts}> {nbGifts}<span className={styles.logoGift}>&copy;</span></span>

                </p>
                <div className={isExpanded ? styles.separationHide : styles.separationDisplay}>
                    <SectionNameSeparation />
                </div>
            </div>


            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <p style={{ color: color }} className={styles.intro}>{decodeCaracteresSpeciaux(data.intro)}</p>

                <div className={styles.giftsSection} style={{ backgroundColor: props.color }}>


                    <div className={styles.absoluteContainer}>
                        <StartSeparationSection />
                        <div className={styles.secretMessageLogos}>
                            {!openedSecretMessage &&

                                <span><FontAwesomeIcon
                                    className={styles.secretMessageIcon}
                                    icon={faMessage}
                                    onClick={() => setOpenedSecretMessage(data.idUser)}
                                /></span>
                            }
                            {openedSecretMessage &&
                                <div className={styles.sendMailContainer}>
                                    <div>
                                        <img
                                            className={styles.messageIcon}
                                            src={"images/handGift.png"}
                                            alt="Image"
                                            height="40px"
                                            onClick={() => openSecretMessage("person")}

                                        />
                                        {data.isAdult &&
                                            <img
                                                className={styles.messageIcon}
                                                src={"images/santaClaus.png"}
                                                alt=" Image"
                                                height="40px"
                                                onClick={() => openSecretMessage("santaClaus")}

                                            />
                                        }
                                    </div>
                                    {openedSantaClausSecretMessage &&

                                        <SendMail
                                            name={data.pseudo}
                                            mailRecipient="santaClaus"
                                            closeMailSend={() => closeMailSend()}

                                        />
                                    }
                                    {openedPersonSecretMessage &&

                                        <SendMail
                                            name={data.pseudo}
                                            mailRecipient="person"
                                            closeMailSend={() => closeMailSend()}
                                        />
                                    }
                                </div>

                            }


                        </div>


                        <div className={styles.giftsList}>
                            {/*...Affichage du JSX stocké dans la variable giftsList */}
                            {giftsList}
                        </div>
                        {/*...Affichage du composant */}
                        <EndSeparationSection />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GiftsContainer;
