import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFloppyDisk, faGift, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

//______________________________________________________________________________


function UserConnectedGiftDetailOffered(props) {

    //....Récupération des données contenues dans les propriétés de composants
    const {
        data,
        index,
        idListe,
        handleOfferedClick
    }
        = props;



    //______________________________________________________________________________

    return (
        <>
            <div className={styles.offeredGift}>

                <div className={styles.giftDetailOffered}>
                    <div className={styles.offeredGiftTitleAndLink}>

                        <h1>{data.title}</h1>
                        <p>{data.detail}</p>
                        <p className={styles.offeredGiftUrl}>{data.url}</p>

                    </div>
                    <div className={styles.giftLinkUserConnectedOffered}>

                        <FontAwesomeIcon
                            className={`${styles.givedIcon} ${styles.giftIcon}`}
                            icon={faRecycle}
                            // onclick={handleOfferedClick}
                            onClick={() => handleOfferedClick(index, idListe, data.offered)}
                        />

                    </div>

                </div>

            </div>
        </>
    );
}

export default UserConnectedGiftDetailOffered;