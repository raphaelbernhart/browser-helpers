/**
 * Generates ID
 *
 *
 * @param length - How many characters the generated ID should have
 * @returns The generated ID
 *
 */
export const genID = (length?: number): string => {
    let finalLength = 5;
    if (length) finalLength = length;

    const id = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    let i = 0;
    let finalID = id();

    while (i < finalLength - 1) {
        finalID = finalID + "-" + id();

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
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
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
export const initConsole = (title: string): void => {
    setTimeout(() => {
        console.clear();
        const spacingCount: number = 25 - title.length;
        const halfSpacingCount: number = spacingCount / 2;
        let newTitle: string = title;
        let titleIsOdd;
        if (halfSpacingCount % 2 === 1) titleIsOdd = true;
        else titleIsOdd = false;

        for (let i = 0; i < spacingCount; i++) {
            if (halfSpacingCount > i + 1) newTitle = `\x20${newTitle}`;
            else newTitle = `${newTitle}\x20`;

            if (titleIsOdd) newTitle = newTitle.slice(0, newTitle.length);
        }
        console.log(`-------------------------------------------${
            !titleIsOdd ? "" : "--"
        }
-------- ${!titleIsOdd ? "" : "  "}${newTitle} --------
-------------------------------------------${!titleIsOdd ? "" : "--"}`);
        console.log(`
╔╗──╔╗─╔╗─╔╗──────────╔╗───────╔╗───────╔╗─────╔╗
║╚╦╦╬╬╗║╚╗║╚╦╦╗╔╦╦═╗╔═╣╚╦═╗╔═╦╗║╚╦═╦╦╦═╦╣╚╦═╗╔╦╣╚╗
║╬║║║║╚╣╔╣║╬║║║║╔╣╬╚╣╬║║║╬╚╣╩╣╚╣╬║╩╣╔╣║║║║║╬╚╣╔╣╔╣
╚═╩═╩╩═╩═╝╚═╬╗║╚╝╚══╣╔╩╩╩══╩═╩═╩═╩═╩╝╚╩═╩╩╩══╩╝╚═╝
────────────╚═╝─────╚╝`);
    }, 250);
};
