import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faLink, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';
import GiftDetail from './GiftDetail';
import StartSeparationSection from './smallElements/StartSeparationSection';
import EndSeparationSection from './smallElements/EndSeparationSection';

function GiftsContainer(props) {
    const {
        data,
        onClick,
        isExpanded,
    } = props;

    const [openedDetailIndex, setOpenedDetailIndex] = useState(null);


    const handleGiftClick = (index) => {
        if (openedDetailIndex === index) {
            // Si la section actuellement ouverte est cliquée à nouveau, fermez-la.
            setOpenedDetailIndex(null);
        } else {
            // Sinon, ouvrez la section correspondante.
            setOpenedDetailIndex(index);
        }
    };

    const giftsList = data.gifts.map((data, index) => (
        <div className={styles.gift} key={index}>
            <GiftDetail
                isExpanded={openedDetailIndex === index}
                onClick={() => handleGiftClick(index)}
                data={data}
                index={index}
                // onInputChange={handleInputChange} // Passez la fonction de rappel
            />
        </div>
    ));

    return (
        <>
            <div
                onClick={onClick}
                className={styles.nameSection}
                style={{ color: props.color }}>
                {props.data.pseudo}
            </div>

            <div className={isExpanded ? styles.detailDisplay : styles.detailHide}>
                <div className={styles.giftsSection} style={{ backgroundColor: props.color }}>
                    <div className={styles.absoluteContainer}>
                        <StartSeparationSection />
                        <div className={styles.giftsList}>
                            {giftsList}
                        </div>
                        <EndSeparationSection />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GiftsContainer;
