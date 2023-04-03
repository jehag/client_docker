import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
    return (
        <div className={styles['loading-container']}>
            <div className={styles["spinner-container"]}>
                <div className={styles["loading-spinner"]}></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;