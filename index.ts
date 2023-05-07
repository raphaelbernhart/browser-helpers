/**
 * Generates a random Id with specified length
 *
 *
 * @param {number} length How many characters the generated ID should have
 * @param {boolean} [trailingDash] If the id should contain trailing dashes
 * @returns {string} The generated Id
 *
 */
export const genID = (
    length: number = 5,
    trailingDash: boolean = true
): string => {
    const id = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    let i = 0;
    let finalID = id();

    while (i < length - 1) {
        finalID = `${finalID}${trailingDash === true ? "-" : ""}${id()}`;
        i++;
    }

    return finalID;
};

/**
 * Sanitize the <script> tag out of a string
 *
 *
 * @param string - The input string which should be sanitized
 * @returns Sanitized string
 *
 */
export const sanitize = (string: string): string => {
    const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    return string.replace(regex, " ");
};

/**
 * Generate a random float with min and max range
 *
 *
 * @param min - Minimum float range
 * @param max - Maximum float range
 * @param decimals - To how many decimals should be rounded
 * @returns Random Float
 *
 */
export const randomFloat = (
    min: number,
    max: number,
    decimals: number
): number => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
};

/**
 * Check if a string is a valid url
 *
 *
 * @param string - Input string
 * @returns Boolean - True if a valid url
 *
 */
export const isUrlValid = (string: string): boolean => {
    const regexp =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    if (regexp.test(string)) {
        return true;
    } else {
        return false;
    }
};

// TODO
// Check for CTRL, SHIFT and ALT keys
/**
 * Listen for keystrokes of a certain key
 *
 *
 * @param window - The browser window
 * @param keystroke - The KeyboardEvent code (e.g. 'Enter') https://docstore.mik.ua/orelly/webprog/DHTML_javascript/0596004672_jvdhtmlckbk-app-b.html
 * @param callbackFunction - The function which should be fired at keydown event
 * @returns Boolean - The callback to clear the listener later
 *
 */
export const listenKeystroke = (
    window: Window,
    keystroke: string,
    callbackFunction: Function
): Function => {
    const callback = (event: KeyboardEvent) => {
        if (event.code !== keystroke) return;
        callbackFunction();
    };
    window.addEventListener("keydown", callback);
    return callback;
};

// TODO
// Add Function which clears keystroke listener from 'listenKeystroke' function
// export const removeKeystrokeListener = (
//     window: Window,
//     fnc: Function,
// ): void => {
//     window.removeEventListener('keydown', fnc);
// };

/**
 * Navigate the current window or a new window in the browser
 *
 *
 * @param window - The browser window
 * @param url - The KeyboardEvent code (e.g. 'Enter') https://docstore.mik.ua/orelly/webprog/DHTML_javascript/0596004672_jvdhtmlckbk-app-b.html
 * @param newTab - Open a new tab or navigate the current one
 *
 */
export const navigateTab = (
    window: Window,
    url: string,
    newTab?: boolean
): void => {
    if (!isUrlValid(url)) throw new Error("Url is not valid");

    const target = newTab ? "_blank" : "";
    window.open(url, target);
};

/**
 * Navigate the current window or a new window in the browser
 *
 *
 * @param window - The browser window
 * @param url - The KeyboardEvent code (e.g. 'Enter') https://docstore.mik.ua/orelly/webprog/DHTML_javascript/0596004672_jvdhtmlckbk-app-b.html
 * @param newTab - Open a new tab or navigate the current one
 *
 */
export const initConsole = (
    author: string,
    title: string,
    repository?: string,
    websiteUrl?: string
): void => {
    // Error Checking
    if (!author) throw "Author is undefined";
    if (!title) throw "Title is undefined";

    const logInitialitation = () => {
        // Log

        console.log(
            `%cThis is ${title}\n%c\nDo you see bugs or room for improvement -> Feel free to report them and open an issue.\n\n${
                repository ? `🚩 Open an issue: ${repository}\n` : ""
            }${
                websiteUrl ? `🌐 Take a look at my website: ${websiteUrl}` : ""
            }`,
            "font-size: 18px",
            "color: white"
        );
        // Log Author
        console.log(
            "\n%cbuilt by Raphael Bernhart\n\n",
            "font-weight: bold; font-size: 32px;color: #FFF3DA; text-shadow: 2px 2px 0 #262626 , 4px 4px 0 #F46932 , 6px 6px 0 #F19C2E , 8px 8px 0 #F63535"
        );
    };

    setTimeout(() => {
        logInitialitation();
    }, 500);
};
