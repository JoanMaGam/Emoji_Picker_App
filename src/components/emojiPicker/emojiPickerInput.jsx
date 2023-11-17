import { useRef } from "react";
import EmojiPicker from "./emojiPicker";

import styles from './emojiPicker.module.scss';

function EmojiPickerInput() {

    const refInput = useRef(null);


    return (
        <div className={styles.emojiPickerInputContainer}>
            <input type="text" ref={refInput} />
            <EmojiPicker ref={refInput} />
        </div>
    );
}

export default EmojiPickerInput;