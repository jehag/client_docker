import styles from "./Search.module.css";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useRef } from "react";

function Search(props) {
    const inputRef = useRef();

    function handleSearch(e) {
        e.preventDefault();
        
        if (!e.target[0].value.trim()) return;

        props.onSearch(e.target[0].value);
    };

    return (
        <div className={styles.container}>
            <div className={styles['search-container']}>

                <FaSearch />

                <form 
                    className={styles['search-form']} 
                    onSubmit={handleSearch}>

                    <input
                        autoFocus
                        className={styles.search}
                        type="text"
                        placeholder="Quelle célébrité souhaitez-vous ajouter?"
                        autoComplete="off"
                        ref={inputRef}
                    />

                    <button type="submit">
                        <div>Rechercher</div>
                        <FaChevronRight />
                    </button>
                
                </form>

            </div>
        </div>
    );
}

export default Search;
