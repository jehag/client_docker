import React, { useState } from "react";
import styles from "./Choose-image.module.css";

const ChooseImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={styles.container}>
        <h1>Téléverser une image</h1>
        {selectedImage && (
            <div>
                <img alt="not fount" height={"400rem"} src={URL.createObjectURL(selectedImage)} />
            </div>
        )
        }

        <div className={styles['input-container']}>
            <button 
                className={styles['choose-button']} 
                onClick={() => 
                    document.getElementById('getFile').click()
                }>
                    Sélectionner une image
            </button>
            
            <input
                hidden
                type='file' 
                id="getFile" 
                name="myImage"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    props.onChooseImage(event.target.files[0]);
                }}
            />
        </div>

    </div>
  );
};

export default ChooseImage;