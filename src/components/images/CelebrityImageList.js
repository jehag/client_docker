import { useState } from "react";
import styles from "./CelebrityImageList.module.css";
import SelectableImageItem from "./SelectableImageItem";

function CelebrityImagesList(props) {
    const [checkedState, setCheckedState] = useState(new Array(props.images.length).fill(false));

    function handleSelect(position) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }

    function addCelebrity() {
        const legitImages = [];

        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i]) continue;

            legitImages.push(props.images[i]);
        }

        props.addCelebrity(legitImages, props.celebrity);
    }

    return (
        <div className={styles.body}>

            <div className={styles['description-text']}>
                Voici quelques résultats obtenus pour <strong>{props.celebrity}</strong>.
                <br/>
                Afin d'aider le système à correctement identifier cette personnalité,
                <br /> 
                <span style={{color: 'rgb(241, 66, 66)', fontStyle: 'italic'}}>veuillez sélectionner les images <strong>illégitimes</strong>.</span>
            </div>

            <div className={styles['image-list']}>

                <ul className={styles.list}>
                    {
                        props.images.map((image, i) => {
                            return <SelectableImageItem
                                    key={i}
                                    image={image}
                                    position={i}
                                    handleSelect={handleSelect}
                                />
                        })
                    }
                </ul>
            
            </div>

            <div className={styles['action-buttons']}>
                <button
                    className={styles['add-celebrity']}
                    onClick={addCelebrity}
                >
                    Ajouter
                </button>
            </div>

        </div>
    );
}

export default CelebrityImagesList;