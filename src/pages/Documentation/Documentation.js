import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Documentation.module.css";

export default function DocumentationPage() {

    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            <div>
                Documentation
            </div>
        </main>
    );
}