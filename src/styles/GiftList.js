import styles from '../styles/Home.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faLink, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/formatDate';
import GiftDetail from '../components/UserConnectedGiftDetail';

function GiftsList(props) {

    const data = props.data;
    const onChange = props.onChange;

    const [openedDetailIndex, setOpenedDetailIndex] = useState(null);
    const [editingData, setEditingData] = useState({
        isEditing: false,
        titleInput: '',
        textInput: '',
        urlInput: '',
    });

    // Fonction de gestion des modifications des inputs
    const handleInputChange = (modifiedData) => {
        // Mettre à jour l'état `editingData` avec les données modifiées
        setEditingData(modifiedData);
        onChange();
    };

    const handleGiftClick = (index) => {
        if (openedDetailIndex === index) {
            // Si la section actuellement ouverte est cliquée à nouveau, fermez-la.
            setOpenedDetailIndex(null);
        } else {
            // Sinon, ouvrez la section correspondante.
            setOpenedDetailIndex(index);
        }
    };

    const giftsList = data.map((data, index) => (
        <div className={styles.gift} key={index}>
            <GiftDetail
                key={index}
                isExpanded={openedDetailIndex === index}
                onClick={() => handleGiftClick(index)}
                data={data}
                // index={index}
                onInputChange={handleInputChange} // Passez la fonction de rappel
            />
        </div>
    ))

    return (

        <div className={styles.giftsList}>
            {giftsList}
        </div>

    )
}

export default GiftsList;