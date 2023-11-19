import styles from '../../styles/Home.module.css';

const EndSeparationSection = () => {
    const numParagraphs = 30; 

    const lines = Array.from({ length: numParagraphs }, (_, index) => (
        <p key={index}>~</p>
    ));

    return (
        <div className={styles.endSeparationSection}>
            {lines}
        </div>
    );
}

export default EndSeparationSection;