import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCartPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';
import styles from '../styles/Home.module.css';

function GiftDetail(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {
        data,
        isExpanded,
        onClick,
        onClickCartPlus,
        index,
        idListe,
        onUrlClick,
        lowestOrderGift,
    } = props;

    console.log(data)

    const handleCartPlusClick = () => {
        setIsModalVisible(true);
    };

    const handleValidation = () => {
        const modifiedData = {
            ...data,
            id: 999998,
            Ordre: lowestOrderGift.Ordre-1,
            idListe: idListe,
            giftKey: 999998
        };

        onClickCartPlus(modifiedData);
        setIsModalVisible(false);
    };

    return (
        <>
            <div className={styles.giftDetail}>
                <h3 className={styles.giftTitle}>
                    {data.title}{' '}
                    <FontAwesomeIcon
                        className={styles.giftIcon}
                        icon={isExpanded ? faCaretUp : faCaretDown}
                        onClick={onClick}
                    />
                </h3>

                <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                    <p className={styles.giftText}>
                        {data.detail}
                        {data.url && <a className={styles.linkIcon} onClick={() => onUrlClick(data.url)}>
                            <FontAwesomeIcon className={styles.giftIcon} icon={faLink} />
                        </a>}
                    </p>
                    <p className={styles.updateDate}>Modifié le : {formatDate(data.date)}</p>
                </div>
            </div>

            <div className={styles.giftLink}>
                <FontAwesomeIcon className={styles.giftIcon} icon={faCartPlus} onClick={handleCartPlusClick} />
            </div>

            {/* Modale de demande de validation */}
            {isModalVisible && (

                <div className={styles.stolenModal}>
                    <div className={styles.modalDialog}>
                        <p>Confirmez-vous l&apos;ajout de ce cadeau ?</p>
                        <button onClick={handleValidation}>Valider</button>
                        <button onClick={() => setIsModalVisible(false)}>Annuler</button>
                    </div>
                </div>)}
        </>
    );
}

export default GiftDetail;