import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faLink, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';
import GiftDetail from './GiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';

//______________________________________________________________________________

function GiftsContainer(props) {

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        onClick,
        isExpanded,
        onClickCartPlus,
        color
    } = props;

//______________________________________________________________________________


    //....Etat de gestion de l'affichage ou masquage des détails du cadeau
    const [openedDetailIndex, setOpenedDetailIndex] = useState(null);

//______________________________________________________________________________


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

//______________________________________________________________________________

    //....Fonction de vol de cadeau
    const handleCartPlusClick = (data) => {
        //....Envoyer les données au parent (GiftsContainer)
        onClickCartPlus(data);
    };
//______________________________________________________________________________

    //....Création de la variable contenant les div d'affichage des différents cadeaux
    const giftsList = data.gifts.map((data, index) => (
        //....récupérés du tableau de données tableau de données
        //....un composant par cadeau
        <div className={styles.gift} key={index}>
            <GiftDetail
                //....statut de l'affichage des détail
                isExpanded={openedDetailIndex === index}
                //....fonction de clic sur le plus ou moins pour affichage détail
                onClick={() => handleGiftClick(index)}
                //....données
                data={data}
                //....clé obligatoire
                index={index}
                //....fonction de vol de cadeau
                onClickCartPlus={handleCartPlusClick}
            />
        </div>
    ));

//______________________________________________________________________________

    //....Affichage
    return (
        <>

            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: color }}>
                {data.pseudo}
            </div>


            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection} style={{ backgroundColor: props.color }}>
                    <div className={styles.absoluteContainer}>
                        {/*...Affichage du composant */}
                        <StartSeparationSection />
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
