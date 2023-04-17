import { useState } from "react";
import ImageItem from "./ImageItem";

import styles from "./ImageList.module.css";

function ImageList(props) {
    const [imageCount, setImageCount] = useState(Math.min(props.displaySize, props.images.length));

    function showMore() {
        setImageCount(Math.min(imageCount + props.displaySize, props.images.length))
    }

    return (
        <div className={styles.body}>

            <div className={styles['image-list']}>

                <ul className={styles.list}>
                    {(() => {
                        let images = [];
                        for (let i = 0; i < imageCount; i++) {
                            images.push(
                                <ImageItem
                                    key={props.images[i].id}
                                    image={props.images[i].image}
                                    title={props.images[i].title}
                                    normalCaption={props.images[i].normalCaption}
                                    aiCaption={props.images[i].aiCaption}
                                    />
                            );
                        }
                        return images;
                    })()}

                </ul>
            
            </div>

            <div className={styles['action-buttons']}>
                <button
                    className={styles['show-more']}
                    onClick={showMore}
                    disabled={imageCount === props.images.length}>
                    Plus de résultats
                </button>

                <div className={styles['image-count']}>
                    {imageCount} / {props.images.length}
                </div>
            </div>

        </div>
    );
}

export default ImageList;