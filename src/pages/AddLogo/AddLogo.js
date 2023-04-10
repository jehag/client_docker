import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/placeholders/LoadingSpinner";
import styles from "./AddLogo.module.css";

export default function AddLogoPage() {
    const inputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [logos, setLogos] = useState([]);
    const [isLogoAdded, setLogoAdded] = useState(false);
    
    const [apiUrl, setApiUrl] = useState('');
    // useEffect(() => {
    //     const url = window._env_.REACT_APP_FACE_RECOGNITION_API_URL;
    //     if (url) setApiUrl(url);
    // }, [setApiUrl]);

    const addImage = () => {
        setLogoAdded(false);
        setIsLoading(true);
        const image = selectedImage;
        const name = inputRef.current?.value;
        
        let imageBase64 = "";
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string
            imageBase64 = reader.result.split(',')[1];
            const fileType = image.name.split(".").pop().toLowerCase();
            fetch(
                `${apiUrl}/celebrity/add/single`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name,
                        image: imageBase64,
                        fileType: fileType
                    })
                })
                .then((res) => {
                    return res.text();
                })
                .then((res) => {
                    setSelectedImage(null);
                    setLogoAdded(true);
                    setTimeout(() => setIsLoading(false), 200);
                })
                .catch(error => {
                    console.error(error);
                    setSelectedImage(null);
                    setLogoAdded(true);
                    setTimeout(() => setIsLoading(false), 200);
                });
          }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    };

    // useEffect(() => {
    //     fetch(`${apiUrl}/celebrities`)
    //     .then((response) => response.json())
    //     .then((data) => setLogos(data.celebrities));
    // }, [apiUrl, setLogos]);


    fetch(`${window._env_.REACT_APP_SERVER_API_URL}/caption-images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            container_name: 'serverimages'
        })})
    .then((response) => response.json())
    .then((data) => console.log(data));

    return (
        <main>
            <Link to='/add' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            {
                isLoading ? <LoadingSpinner /> :

                <div className={styles['main-container']}>
                    <div className={styles.container}>
                        <h1>Téléverser une image</h1>
                        {
                            selectedImage && (
                                <div>
                                    <img alt="not fount" height={"400rem"} src={URL.createObjectURL(selectedImage)} />
                                </div>
                            )
                        }

                        {
                            !isLogoAdded ? 
                                <></> :
                                <div className={styles['description']}>
                                    <FaCheck className={styles['first-search-icon']} />
                                    <div className={styles['first-search-title']}>L'image a été ajoutée avec succès!</div>
                                    <div className={styles['first-search-description']}>
                                        Voulez-vous ajouter une autre image?
                                    </div>
                                </div>
                                
                        }

                        <div className={styles['input-container']}>
                            <button 
                                className={styles['choose-button']} 
                                onClick={() => {
                                        setLogoAdded(false);
                                        document.getElementById('getFile').click()
                                        document.getElementById('getFile').focus()
                                    }
                                }
                            >
                                    Sélectionner une image
                            </button>
                            
                            <input
                                hidden
                                type='file' 
                                id="getFile" 
                                name="myImage"
                                accept=".png, .jpg"
                                onChange={(event) => {
                                    setLogoAdded(false);
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </div>

                    </div>

                    {
                        !selectedImage ? '' :
                            <div className={styles['input-response']}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box"
                                    options={logos}
                                    sx={{ width: "40rem" }}
                                    renderInput={(params) => 
                                        <TextField 
                                        {...params} 
                                        label="Nom du logo"
                                        inputRef={inputRef}
                                    />}
                                />
                                <button 
                                    id="addButton"
                                    onClick={() => {
                                        setLogoAdded(false);
                                        addImage();
                                    }}
                                    >Ajouter</button>
                            </div>
                    }
                </div>
            }

        </main>
    );
}