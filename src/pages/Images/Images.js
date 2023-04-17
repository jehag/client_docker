import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageList from "../../components/images/ImageList";
import TagsLegend from "../../components/legend/TagsLegend";
import LoadingSpinner from "../../components/placeholders/LoadingSpinner";
import styles from "./Images.module.css";

export default function AllImagesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);

    const [apiUrl, setApiUrl] = useState('');
    useEffect(() => {
        const url = window._env_.REACT_APP_SERVER_API_URL;
        if (url) setApiUrl(url);
    }, [setApiUrl]);

    useEffect(() => {
        function onFetchImages() {
            console.log("Fetching all images");
            setIsLoading(true);
            
            fetch(
                `${apiUrl}/search`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        key: "",
                        type: ['normal', 'IA']
                    })
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res.length === 0) {
                        console.log('Pwobleme')
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
                        setLoadedImages(images);
                    }

                    setTimeout(() => setIsLoading(false), 200);
                })
                .catch(error => {
                    console.error(error)
                    setIsLoading(false);
                });
        }
        onFetchImages()
    }, [apiUrl]);

    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            <div className={styles['all-images-container']}>
                { 
                    isLoading ?   <LoadingSpinner />
                    :
                        <>
                            <TagsLegend />
                            <ImageList
                                images={loadedImages}
                                displaySize={20}
                            />
                        </>
                }
            </div>
        </main>
    );
}