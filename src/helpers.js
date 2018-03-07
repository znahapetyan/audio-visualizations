export const getRandomColor = function () {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

export const subscribeToFileLoad = function (input, callBack) {
    input.onchange = function () {
        const file = this.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            callBack(reader.result);
        }

        reader.readAsArrayBuffer(file);
    }
};
