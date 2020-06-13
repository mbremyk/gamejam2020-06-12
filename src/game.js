const {defaults} = require('./defaultValues');

function nextYear(values) {
    let vals = {...values};

    vals.gold += vals.population * vals.tax / 100;
    vals.population += vals.population * vals.growth / 200;

    return vals;
}

function reset(setValues) {
    setValues(defaults);
    save(defaults);
}

let save = (values) => {
    localStorage.setItem('values', JSON.stringify(values));
}

module.exports = {nextYear, save, reset};