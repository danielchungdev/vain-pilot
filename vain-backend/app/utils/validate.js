import moment from 'moment';

// functions to validate user input
// validate year
function validateYear(year) {
    if (typeof year != Number) {
        return false;
    }
    else if (year < 0 ) {
        return false;
    }
    else if (year > moment.year()) {
        return false;
    }

    return true;
}

// validate _ isn't empty, null, or undefined
function validateInputHasSomething(input) {

}

// verify string length method
function validateInputIsNotLargerThan(input, size) {

}
// 45
// 200
// 20
// 2
// 450

// verify date
function validateDateFormat(date) {

}