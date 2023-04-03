import styles from "./CelebrityAddSuccess.module.css";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

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

                <div className={styles['add-image']}>
                    <div>Avez-vous plutôt une image d'une célébrité à ajouter?</div>
                    
                    <Link to='/add-celebrity' className={styles['go-back']}>
                        <button
                            className={styles['add-celebrity']}
                            onClick={props.addCelebrityImage}
                        >
                            Ajouter une image
                        </button>
                    </Link>
                </div>
            </div>
        );
}