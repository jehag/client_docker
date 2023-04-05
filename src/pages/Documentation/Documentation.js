import { FaArrowLeft, FaFileAlt, FaFileCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Documentation.module.css";

export default function DocumentationPage() {

    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            <h1>Documentation</h1>
            <div className={styles["actions-container"]}>
            
                <div 
                    className={styles["action-button"]}
                    onClick={() => window.open('https://docs.google.com/document/d/1R21lMlfqzTdyk15IVviSL_4esLLNWf04paVjbJ6YmGU/edit#', '_blank')}>
                    <div className={`${styles["link"]}`}>
                        <FaFileAlt />
                        Documentation usager
                    </div>
                </div>
            
                <div 
                    className={styles["action-button"]}
                    onClick={() => window.open('https://docs.google.com/document/d/16hk6lhObps5QXdSP3PsR6oKMGjiIMtfQ/edit#', '_blank')}>
                    <div className={`${styles["link"]}`}>
                        <FaFileCode />
                        Documentation technique
                    </div>
                </div>

            </div>
        </main>
    );
}