import styles from "./NotFound.module.css";
import { FaRegFrown } from "react-icons/fa";

function NotFound({message, subMessage}) {
    return (
            <div className={styles['not-found']}>
                <FaRegFrown className={styles['not-found-icon']} />
                <div className={styles['not-found-title']}>{message}</div>
                <div className={styles['not-found-description']}>{subMessage}</div>
            </div>
        );
}

export default NotFound;