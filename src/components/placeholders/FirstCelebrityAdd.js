import styles from "./FirstCelebrityAdd.module.css";
import { FaSearch } from "react-icons/fa";

export default function FirstCelebrityAdd(props) {
    return (
            <div className={styles['first-search']}>
                <div></div>
                
                <div className={styles['description']}>
                    <FaSearch className={styles['first-search-icon']} />
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