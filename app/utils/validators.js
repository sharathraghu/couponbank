
var validators = {
    newUser: {
        exampleInputEmail1: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Email is not valid'
        },
        exampleInputPassword1: {
            notEmpty: true,
            isLength: {
                min: 6
            },
            errorMessage: 'Password is not valid'
        },
        firstName: {
            notEmpty: true,
            isNumeric: false,
            errorMessage: 'Looks like your First name is ....'
        },
        lastName: {
            notEmpty: true,
            isNumeric: false,
            errorMessage: 'Looks like your Last Name is ...'
        }
    },
    existingUser: {
        exampleInputEmail1: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Email is not valid'
        },
        exampleInputPassword1: {
            notEmpty: true,
            isLength: {
                min: 6
            },
            errorMessage: 'Password is not valid'
        }
    }
};

module.exports = validators;