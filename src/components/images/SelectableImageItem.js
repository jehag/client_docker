import { useRef } from 'react';
import classes from './SelectableImageItem.module.css';

function SelectableImageItem(props) {
    const checkboxRef = useRef(null);

    function toggleCheckbox() {
        checkboxRef.current.checked = !checkboxRef.current.checked;
        props.handleSelect(props.position);
    }
    
    return (
        <li 
            className={classes['celebrity-li']} 
        >
            
            <input 
                className={classes['celebrity-input']} 
                type='checkbox' 
                ref={checkboxRef}
                onClick={(e) => e.stopPropagation()}
            />
            <div className={classes.image}   
                onClick={() => toggleCheckbox()}
                onDoubleClick={(e) => e.preventDefault()}
                style={{ userSelect: 'none' }}
            >
                
                <img src={props.image} alt={props.title} />
            </div>

        </li>
    );
}

export default SelectableImageItem;