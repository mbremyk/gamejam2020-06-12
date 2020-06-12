function nextYear(values)
{
    let vals = {...values};

    vals.gold += vals.population * vals.tax / 100;
    vals.population += vals.population * vals.growth / 200;

    return vals;
}

module.exports = {nextYear};