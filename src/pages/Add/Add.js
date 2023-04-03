import { FaImage, FaStar, FaArrowLeft, FaFootballBall } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Add.module.css";

export default function AddPage() {
    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>
            
            <h1>Ajouter une image</h1>
            <div className={styles["actions-container"]}>
            
                <div className={styles["action-button"]}>
                    <Link to='/add-image' className={styles["link"]}>
                        <FaImage />
                        Ajouter une image <br/> 
                        quelconque et sa description
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/add-celebrity' className={styles["link"]}>
                        <FaStar />
                        Ajouter une image<br/>
                         d'une célébrité
                    </Link>
                </div>
            
                <div className={styles["action-button"]}>
                    <Link to='/add-logo' className={styles["link"]}>
                        <FaFootballBall />
                        Ajouter une image<br/>
                         d'un logo
                    </Link>
                </div>

            </div>
        </main>
    );
}