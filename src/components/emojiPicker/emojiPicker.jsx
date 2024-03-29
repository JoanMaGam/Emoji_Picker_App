import { forwardRef, useEffect, useRef, useState } from "react";

import { data as emojiList } from "./data";
import EmojiSearch from "./emojiSearch";
import EmojiButton from "./emojiButton";

import styles from "./emojiPicker.module.scss"


const EmojiPicker = forwardRef(function EmojiPicker(props, inputRef) {

    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState(emojiList);

    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', e => {
            if (!containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });
    }, []);

    function handleClickOpen() {
        setIsOpen(!isOpen);
    }

    function handleSearch(e) {
        console.log(e);
        console.log(e.target.value);
        console.log(props);
        console.log(inputRef);
        const query = e.target.value.toLowerCase();

        if (!!query) {
            const search = emojiList.filter(emoji => {
                return emoji.name.toLowerCase().includes(query) || emoji.keywords.toLowerCase().includes(query);
            });
            setEmojis(search);
        } else {
            setEmojis(emojiList);
        }
    }

    // function EmojiPickerContainer() {
    //     return (
    //         <div>
    //             <EmojiSearch onSearch={handleSearch} />
    //             <div>
    //                 {emojiList.map((emoji) => (
    //                     <div key={emoji.symbol}>{emoji.symbol}</div>
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // }

    function handleOnClickEmoji(emoji) {
        const cursorPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursorPos);
        const next = text.slice(cursorPos);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
        inputRef.current.focus();
    }

    return (
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😊</button>

            {isOpen ? (
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch} />
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji} />
                        ))}
                    </div>
                </div>
            ) : ""}
        </div>
    );
})

export default EmojiPicker;