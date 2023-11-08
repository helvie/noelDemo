import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faLink, faHandBackFist, faCartPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
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

                <h3 className={styles.giftTitle}>{data.title} <FontAwesomeIcon
                    className={styles.giftIcon}
                    icon={isExpanded ? faCaretUp : faCaretDown}
                    onClick={onClick}
                /></h3>

                <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                    <p className={styles.giftText}>{data.detail} <a className={styles.linkIcon} href={data.url} target="_blank" rel="noopener noreferrer">
                    {data.url &&<FontAwesomeIcon className={styles.giftIcon} icon={faLink} />}
                </a></p>
                    <p className={styles.updateDate}>Modifié le : {formatDate(data.date)}</p>
                </div>

            </div>

            <div className={styles.giftLink}>

                <FontAwesomeIcon
                    className={styles.giftIcon}
                    icon={faCartPlus}
                    onClick={handleCartPlusClick} />

            </div>
        </>

    )
}

export default GiftDetail;