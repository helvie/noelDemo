import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


////////////////////////////////////////////////////////////////////////////////

const UserGiftTarget = (props) => {

    const user = useSelector((state) => state.user);

    const {
        closeTargetSection
    }
    = props;


    return (

        <div className={styles.changeUserDataContainer}>
            <h2>Ta cible est :</h2>
            <h1>{user.cible}</h1>
            

            <div className={styles.userDataSaveLogosContainer}>


                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={() => closeTargetSection()}
                />

            </div>


        </div>

    )
}

export default UserGiftTarget;