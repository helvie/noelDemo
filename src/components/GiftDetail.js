import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faLink, faHandBackFist, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';

//______________________________________________________________________________

function GiftDetail(props) {

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        isExpanded,
        onClick,
        onClickCartPlus,
        index,
    }
        = props;

    //______________________________________________________________________________

    //....Fonction de vol de cadeau
    const handleCartPlusClick = () => {
        //....Envoyer les données au parent (GiftsContainer)
        onClickCartPlus(data);
    };
    //______________________________________________________________________________

    return (
        <>
            <div className={styles.giftDetail}>

                <h3>{data.title}</h3>

                <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>                    <p>{data.detail}</p>
                    <p className={styles.updateDate}>Modifié le : {formatDate(data.date)}</p>
                </div>

            </div>

            <div className={styles.giftLink}>

                <a className={styles.linkIcon} href={data.url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className={styles.giftIcon} icon={faLink} />
                </a>

                <FontAwesomeIcon
                    className={styles.giftIcon}
                    icon={faCartPlus}
                    onClick={handleCartPlusClick} />

                <FontAwesomeIcon
                    className={styles.giftIcon}
                    icon={isExpanded ? faMinus : faPlus}
                    onClick={onClick}
                />
            </div>
        </>

    )
}

export default GiftDetail;