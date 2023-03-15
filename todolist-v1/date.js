    //jshint esversion: true

        // local module
        //date function in the format of dd(letters)-dd(numeric)-mm(letters)-yyyy(numeric)
exports.getDate = function() {
const today = new Date();

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
}

return today.toLocaleDateString("en-NG", options);
}

    // only the day
exports.getDay = function() {
    const today = new Date();
    
    const options = {
        weekday: "long",
    }
    
    return today.toLocaleDateString("en-NG", options);
    
}