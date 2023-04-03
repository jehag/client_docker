import { useRef, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/placeholders/LoadingSpinner";
import styles from "./AddImage.module.css";

const apiUrl = process.env.REACT_APP_TAG_GENERATION_API_URL;

export default function AddImagePage() {
    const inputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageAdded, setImageAdded] = useState(false);

    const addImage = () => {
        setImageAdded(false);
        setIsLoading(true);
        const caption = inputRef.current?.value;
        
        let imageBase64 = "";
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string
            imageBase64 = reader.result.split(',')[1];
            const fileType = selectedImage.name.split(".").pop().toLowerCase();
            console.log(caption, fileType);

            fetch(
                `${apiUrl}/caption`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: imageBase64,
                        caption: caption,
                        fileType: fileType
                    })
                })
                .then((res) => {
                    return res.text();
                })
                .then((res) => {
                    setSelectedImage(null);
                    setImageAdded(true);
                    setTimeout(() => setIsLoading(false), 200);
                })
                .catch(error => {
                    console.error(error);
                    setSelectedImage(null);
                    setImageAdded(true);
                    setTimeout(() => setIsLoading(false), 200);
                });
          }, false);

        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        }
    };

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
                            !isImageAdded ? 
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
                                    setImageAdded(false);
                                    document.getElementById('getFile').click()
                                    document.getElementById('getFile').focus()
                                }
                                }>
                                    Sélectionner une image
                            </button>
                            
                            <input
                                hidden
                                type='file' 
                                id="getFile" 
                                name="myImage"
                                accept=".png, .jpg"
                                onChange={(event) => {
                                    setImageAdded(false);
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </div>

                    </div>

                    {
                        !selectedImage ? '' :
                            <div className={styles['input-response']}>
                                <textarea 
                                    className={styles['search']} 
                                    type="text" 
                                    ref={inputRef} />
                                <button 
                                    id="addButton"
                                    onClick={() => {
                                        setImageAdded(false);
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