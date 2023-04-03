
import styles from "./TagsLegend.module.css";

function TagsLegend() {
    return (
        <div className={styles['legend']}>
            <div className={styles['legend-normal']}>
                <div className={styles['legend-normal-color-square']}></div>
                <div className={styles['legend-text']}>
                    Étiquettes actuelles
                </div>
            </div>

            <div className={styles['legend-ai']}>
                <div className={styles['legend-ai-color-square']}> </div>
                <div className={styles['legend-text']}>
                    Étiquettes générées par l'IA
                </div>
            </div>
        </div>
    );
}

export default TagsLegend;