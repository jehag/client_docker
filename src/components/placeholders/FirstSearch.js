import styles from "./FirstSearch.module.css";
import { FaSearch } from "react-icons/fa";

function FirstSearch() {
    return (
            <div className={styles['first-search']}>
                <FaSearch className={styles['first-search-icon']} />
                <div className={styles['first-search-title']}>
                    Effectuez une recherche.
                </div>
                <div className={styles['first-search-description']}>
                    Votre recherche va faire appel à un service d'intelligence artificielle pour obtenir les meilleurs résultats possibles.
                </div>
            </div>
        );
}

export default FirstSearch;