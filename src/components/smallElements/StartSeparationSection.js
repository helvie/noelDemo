import styles from '../../styles/Home.module.css';

////////////////////////////////////////////////////////////////////////////////

const StartSeparationSection = () => {
    const numParagraphs = 30; 

    const lines = Array.from({ length: numParagraphs }, (_, index) => (
        <p key={index}>~</p>
    ));

    return (
        <div className={styles.startSeparationSection}>
            {lines}
        </div>
    );
}

export default StartSeparationSection;