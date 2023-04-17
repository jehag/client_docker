import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageList from "../../components/images/ImageList";
import FirstSearch from "../../components/placeholders/FirstSearch";
import LoadingSpinner from "../../components/placeholders/LoadingSpinner";
import NotFound from "../../components/placeholders/NotFound";
import Search from "../../components/search/Search";

import styles from "./SearchPage.module.css";

function SearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstSearch, setFirstSearch] = useState(true);
    const [isNotFound, setNotFound] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);
    
    const [apiUrl, setApiUrl] = useState('');
    useEffect(() => {
        const apiUrl = window._env_.REACT_APP_SERVER_API_URL;
        if (apiUrl) setApiUrl(apiUrl);
    }, []);

    function onSearch(input, searchType) {
        console.log("Searching for images with words: " + input);
        console.log("Search type: " + searchType);
        setFirstSearch(false);
        setIsLoading(true);
        
        fetch(
            `${apiUrl}/search`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: input,
                    type: searchType
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                if (res.length === 0) {
                    setNotFound(true);
                } else {
                    const images = [];

                    for (let i = 0; i < res.length; i++) {
                        images.push({
                            id: i,
                            image: `${apiUrl}/image/${res[i][0]}`,
                            title: `${i}-${res[i]}`,
                            normalCaption: res[i][1],
                            aiCaption: res[i][2]
                        });
                    }

                    setNotFound(false);
                    setLoadedImages(images);
                }

                setTimeout(() => setIsLoading(false), 200);
            })
            .catch(error => {
                console.error(error)
                setNotFound(true);
                setIsLoading(false);
            });
    }

    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            <div className={styles['search-box']}>
                <Search onSearch={onSearch} />
            </div>

            <div className={styles['image-list']}>
                { 
                    isFirstSearch ? <FirstSearch /> 
                    : isLoading ?   <LoadingSpinner />
                    : isNotFound ? <NotFound 
                        message={'Aucun résultat trouvé.'}
                        subMessage={"Votre recherche n'a renvoyé aucun résultat. Essayez de raccourcir ou de reformuler votre recherche."} />
                    : <ImageList
                        images={loadedImages}
                        displaySize={8}
                    /> 
                }
            </div>
        </main>
    );
}

export default SearchPage;