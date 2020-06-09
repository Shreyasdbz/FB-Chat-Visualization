function decodeFBEmoji(fbString) {
    // Convert String to Array of hex codes
    const codeArray = (
        fbString  // starts as '\u00f0\u009f\u0098\u00a2'
            .split('')
            .map(char => (
                char.charCodeAt(0)  // convert '\u00f0' to 0xf0
            )
            ));  // result is [0xf0, 0x9f, 0x98, 0xa2]

    // Convert plain JavaScript array to Uint8Array
    const byteArray = Uint8Array.from(codeArray);

    // Decode byte array as a UTF-8 string
    return new TextDecoder('utf-8').decode(byteArray);  // '??'
}
