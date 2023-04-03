import styles from "./Search.module.css";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Search(props) {
    const inputRef = useRef();
    const [searchType, setSearchType] = useState(() => ['normal', 'IA']);

    function handleSearch(e) {
        e.preventDefault();
        
        if (!e.target[0].value.trim()) return;

        props.onSearch(e.target[0].value, searchType);
    };

    const handleSearchTypeChange = (event, newSearchType) => {
        if (newSearchType.length === 0) return;
        setSearchType(newSearchType);
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
                        placeholder="Que cherchez-vous?"
                        autoComplete="off"
                        ref={inputRef}
                    />

                    <div className={styles['toggle-button-group']}>
                        <ToggleButtonGroup
                            color="primary"
                            value={searchType}
                            onChange={handleSearchTypeChange}
                            aria-label="search type"
                            >
                                <ToggleButton 
                                    className={styles['toggle-button']} 
                                    value="normal" 
                                    aria-label="normal">
                                        Normal
                                </ToggleButton>
                                
                                <ToggleButton 
                                    className={styles['toggle-button']}
                                    value="IA" 
                                    aria-label="IA">
                                        IA
                                </ToggleButton>

                            </ToggleButtonGroup>

                    </div>

                
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
