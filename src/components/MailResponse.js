import styles from '../styles/Home.module.css';
import React from 'react';
import Header from '../components/smallElements/Header';
import { useSelector, useDispatch } from 'react-redux';

const MailResponse = (props) => {

    const dispatch = useDispatch();

    console.log("coucou")
    return (
         <div className={styles.mailResponseContainer}>

            <p>ESSAI</p>            
</div>
    )
}

export default MailResponse;