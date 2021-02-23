const msToTime = (ms) => {
    let pad = (time, digit = 2) => ('00' + time).slice(-digit);
    return pad(ms/3.6e6 | 0) + ':' + pad((ms%3.6e6)/6e4 | 0) + ':' + pad((ms%6e4)/1000 | 0) + '.' + pad(ms%1000, 3);
}

const calculateTotalTime = (objList, type) => {
    return objList.reduce((sum, obj) => {
        return obj.type === type ? sum + obj.time : sum + 0;
    }, 0);
};

export default {
    msToTime,
    calculateTotalTime
}