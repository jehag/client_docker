import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import CelebrityImagesList from "../../components/images/CelebrityImageList";
import CelebrityAddSuccess from "../../components/placeholders/CelebrityAddSuccess";
import FirstCelebrityAdd from "../../components/placeholders/FirstCelebrityAdd";
import LoadingSpinner from "../../components/placeholders/LoadingSpinner";
import NotFound from "../../components/placeholders/NotFound";
import SearchCelebrity from "../../components/search/SearchCelebrity";
import styles from "./Celebrities.module.css";

export default function CelebritiesPage() {
    const [celebrityName, setCelebrityName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstSearch, setFirstSearch] = useState(true);
    const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
    const [isCelebrityAdded, setCelebrityAdded] = useState(false);
    const [isNotFound, setNotFound] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);

    const [apiUrl, setApiUrl] = useState('');
    useEffect(() => {
        const url = process.env.REACT_APP_FACE_RECOGNITION_API_URL;
        if (url) setApiUrl(url);
    }, [setApiUrl]);

    function onSearch(input) {
        console.log("Searching images for " + input);
        setCelebrityName(input)
        setFirstSearch(false);
        setCelebrityAdded(false);
        setIsLoading(true);
        setNotFound(false);
        setIsAlreadyAdded(false);

        fetch(
            `${apiUrl}/celebrity/search`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: input
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.message) {
                    setIsAlreadyAdded(true);
                }
                else if (!res.urls) {
                    setNotFound(true);
                    setFirstSearch(false);
                    setCelebrityAdded(false);
                    setIsAlreadyAdded(false);
                } else {
                    setLoadedImages(res.urls.filter((url, index) => res.urls.indexOf(url) === index));
                }

                setTimeout(() => setIsLoading(false), 200);
            })
            .catch(error => {
                console.error(error);
                setFirstSearch(false);
                setCelebrityAdded(false);
                setNotFound(true);
                setIsLoading(false);
            });
    }

    function addCelebrity(images, name) {
        if (name.includes(" portrait")) {
            name = name.replace(" portrait", "");
        }
        setIsLoading(true);
        fetch(
            `${apiUrl}/celebrity/add`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    images: images
                })
            })
            .then((res) => {
                return res.text();
            })
            .then((res) => {
                console.log(res);
                setLoadedImages([]);
                setFirstSearch(false);
                setCelebrityAdded(true);
                setTimeout(() => setIsLoading(false), 200);
            })
            .catch(error => {
                console.error(error);
                setFirstSearch(false);
                setCelebrityAdded(false);
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
                <SearchCelebrity onSearch={onSearch} />
            </div>

            <div className={styles['celebrities-list']}>
                {
                    isFirstSearch ? <FirstCelebrityAdd
                            message={"Rechercher et ajouter une célébrité."}
                            subMessage={"Après avoir entré une célébrité, le système va retourner une liste d'image à confirmer."}
                        />
                    : isCelebrityAdded ? <CelebrityAddSuccess
                            message={"La célébrité a bien été ajoutée!"}
                            subMessage={"Ajouter une autre célébrité? Après avoir entré une célébrité, le système va retourner une liste d'image à confirmer."}
                        />
                    : isLoading ? <LoadingSpinner />
                    : isAlreadyAdded ? <FirstCelebrityAdd
                            message={"La célébrité existe déjà!"}
                            subMessage={"Un ensemble d'image pour cette célébrité est déjà présent."}
                        />
                    : isNotFound ? <NotFound
                            message={"Une erreur est survenue."}
                            subMessage={"Veuillez réessayer plus tard."}
                        />
                    : <CelebrityImagesList
                        celebrity={celebrityName}
                        images={loadedImages}
                        displaySize={20}
                        showCaptions={false}
                        addCelebrity={addCelebrity}
                    /> 
                }
            </div>
        </main>
    );
}