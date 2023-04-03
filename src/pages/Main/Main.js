import { FaImage, FaImages, FaInfo, FaRegClosedCaptioning, FaSearch, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";

export default function MainPage() {
    return (
        <main style={{ padding: '0%' }}>
            <div className={styles['logo-container']}>
                <img src='/logo-ledevoir-haute-res.png' alt='logo'></img>
            </div>
            
            <div className={styles["actions-container"]}>
            
                <div className={styles["action-button"]}>
                    <Link to='/images' className={styles["link"]}>
                        <FaImages />
                        Afficher toutes les images
                    </Link>
                </div>
                
                <div className={styles["action-button"]}>
                    <Link to='/add' className={styles["link"]}>
                        <FaImage />
                        Ajouter une image
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/search' className={styles["link"]}>
                        <FaSearch />
                        Effectuer une recherche
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/caption' className={styles["link"]}>
                        <FaRegClosedCaptioning />
                        Obtenir la description d'une image
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/celebrities' className={styles["link"]}>
                        <FaStar />
                        Ajouter une célébrité
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/documentation' className={styles["link"]}>
                        <FaInfo />
                        Accéder à la documentation
                    </Link>
                </div>

            </div>
        </main>
    );
}