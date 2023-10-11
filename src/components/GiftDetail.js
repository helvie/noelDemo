import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faLink, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';


function GiftDetail(props) {

    const {
        data,
        isExpanded,
        onClick,
        index
    }
        = props;

    const [openedDetailIndex, setOpenedDetailIndex] = useState(null);
    // console.log("ceci est le data " + data)

    const handleGiftClick = (index) => {
        if (openedDetailIndex === index) {
            // Si la section actuellement ouverte est cliquée à nouveau, fermez-la.
            setOpenedDetailIndex(null);
        } else {
            // Sinon, ouvrez la section correspondante.
            setOpenedDetailIndex(index);
        }
    };

    return (
        <>
            <div className={styles.giftDetail}>

                <h3>{data.title}</h3>
                <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>                    <p>{data.detail}</p>
                    <p className={styles.updateDate}>Modifié le : {formatDate(data.date)}</p>
                </div>
            </div>
            <div className={styles.giftLink}>
                <FontAwesomeIcon className={styles.giftIcon} icon={faLink}></FontAwesomeIcon>
                <FontAwesomeIcon className={styles.giftIcon} icon={faHandBackFist}></FontAwesomeIcon>
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