import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCartPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';
//______________________________________________________________________________

function GiftDetail(props) {

    const {
        data,
        isExpanded,
        onClick,
        onClickCartPlus,
        index,
        idListe,
        onUrlClick,
        lowestOrderGift
    }
        = props;



    //______________________________________________________________________________

    const handleCartPlusClick = () => {
        const modifiedData = {
            ...data,
            id: 999998,
            Ordre: lowestOrderGift-1,
            idListe: idListe,
            giftKey: 999998
        };

        onClickCartPlus(modifiedData);
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
                    <p className={styles.giftText}>
                        {data.detail}
                        <a
                            className={styles.linkIcon}
                            onClick={()=>onUrlClick(data.url)}
                        >
                            <FontAwesomeIcon
                                className={styles.giftIcon}
                                icon={faLink}
                            />
                        </a>
                    </p>
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