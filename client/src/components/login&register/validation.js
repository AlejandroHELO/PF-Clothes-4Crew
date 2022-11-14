export function validate(input) {
    let errors = {}
    if (!input.email) {
        errors.email = 'The email is not Valid'
    } else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(input.email)) {
        errors.email = 'The email is not valid'
    }

    // if(!input.password) {
    //   errors.password = 'Password is required'
    // } else if((!/(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})/.test(input.password))) {
    //   errors.password ='This password is not valid'
    // }
    if (input.repPassword) {
        if (input.repPassword !== input.password) {
            errors.repPassword = 'The password does not match'
        }
    }
    if (!input.country) {
        errors.country = 'Country is required'
    }
    if (!input.address) {
        errors.address = 'The address is required'
    }
    if (!input.city) {
        errors.city = 'City is required'
    }
    if (!input.state) {
        errors.state = 'State is required'
    }
    if (!input.zipCode) {
        errors.zipCode = 'Zip code is required'
    }

    return errors
}
