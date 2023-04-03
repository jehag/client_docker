import styles from "./Caption.module.css";

function Caption(props) {
    return (
        <div className={styles['caption-container']}>
            <div className={styles['captions']}>
                <div className={styles['description-element']}>
                    <div className={styles['description-title']}>Description française</div>
                    {props.frenchCaption}
                </div>
                <div className={styles['description-element']}>
                    <div className={styles['description-title']}>Description anglaise</div>
                    {props.englishCaption}
                </div>
                {
                    !props.celebrityName ? <></>
                    : 
                        <div div className={styles['description-element']}>
                            <div className={styles['description-title']}>Personnalité identifiée</div>
                            {props.celebrityName}
                        </div>
                }
                {
                    !props.logo ? <></>
                    : 
                        <div className={styles['description-element']}>
                            <div className={styles['description-title']}>Équipe identifiée</div>
                            {props.logo}
                        </div>
                }
            </div>

            <div className={styles['tags']}>
                <div className={styles['description-element-2']}>
                    <div className={styles['description-title']}>Étiquettes</div>
                    <div className={styles['tag-container']}>
                        {
                            !props.imageTags ? '' : 
                            props.imageTags.map((tag, i) => {
                                return <li 
                                    key={i} 
                                    className={styles['tag']}>{tag[2][0]} ({(tag[1] * 100).toFixed(2)}%)
                                </li>
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Caption;