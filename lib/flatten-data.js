'use strict';
// State map from https://gist.github.com/mshafrir/2646763
const STATE_MAP = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'};

module.exports = function flattenData(input) {
    const output = [];
    let state, county;

    for (state in input) {
        const data = input[state];

        for (county in data) {
            const datum = data[county];
            datum.name = `${datum.name}, ${STATE_MAP[state]}`;
            datum.turnout = (datum.t / datum.population).toFixed(4);
            delete data.t;
            output.push(datum);
        }
    }

    return output;
};

module.exports.rdPop = function flattenData(input) {
    const output = [];
    let state, county;

    for (state in input) {
        const data = input[state];

        for (county in data) {
            const datum = data[county];
            delete datum.name;
            delete datum.t;
            datum.rd = datum.r / datum.d;
            delete datum.r;
            delete datum.d;
            output.push(datum);
        }
    }

    return output;
}