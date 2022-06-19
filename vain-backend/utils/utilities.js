/**
 * Helper functions go here
 */

const createQuery = (tableName, data) => {
    if(!tableName || typeof tableName !== 'string'){
        throw new TypeError("Parameter 'tableName' must be a non-empty string")
    }
    if (!data || typeof data !== 'object'){
	    throw new TypeError("Parameter 'data' must be an object");
    }
    let keys = Object.keys(data)
        .filter( (k) =>{
            return data[k] !== undefined;
        });
    let names = keys.map((k, index) => {
        return k + ' = $' + (index + 1);
    }).join(', ');
    let values = keys.map( (k) => {
        return data[k]
    });
    return {
        query: 'UPDATE ' + tableName + ' SET ' + names,
        values: values
    }
};

module.exports = { createQuery };