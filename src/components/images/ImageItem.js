import classes from './ImageItem.module.css';

function ImageItem(props) {
    
    return (
        <li>
 
            <div className={classes.image}>
                <img src={props.image} alt={props.title} />
                <div className={classes['caption-container']}>
                    <div className={classes['normal-caption']}>
                        {props.normalCaption}
                    </div>
                    <div className={classes['ai-caption']}>
                        {props.aiCaption} 
                    </div>
                </div>       
            </div>

        </li>
    );
}

export default ImageItem;