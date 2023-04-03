import styles from "./FirstCelebrityAdd.module.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

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