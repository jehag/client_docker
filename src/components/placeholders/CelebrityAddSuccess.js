import styles from "./CelebrityAddSuccess.module.css";
import { FaCheck } from "react-icons/fa";

export default function CelebrityAddSuccess(props) {
    return (
            <div className={styles['first-search']}>
                <div></div>

                <div className={styles['description']}>
                    <FaCheck className={styles['first-search-icon']} />
                    <div className={styles['first-search-title']}>
                        {props.message}
                    </div>
                    <div className={styles['first-search-description']}>
                        {props.subMessage}
                    </div>
                </div>
                <div></div>
            </div>
        );
}