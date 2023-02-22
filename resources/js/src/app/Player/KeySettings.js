class KeySettings{
    constructor() {

        // set all keys in array on false
        this.keyArray = {
            'KeyW': false,
            'KeyA': false,
            'KeyS': false,
            'KeyD': false,
            'Space': false
        }

        // set all keys in array wich pressed on true
        document.onkeydown = (key) => {
            this.keyArray[key.code] = true;
        }

        // set all keys if key up on false
        document.onkeyup = (key) => {
            this.keyArray[key.code] = false;
        }
    }
}
// export
export default KeySettings;