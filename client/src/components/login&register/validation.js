export function validate(input) {
    let errors = {};
    if(!input.email) {
      errors.email ='Escribe tu email';
    } else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(input.email)) {
      errors.email = 'El email es invalido'
    } 
    
    if(!input.password) {
      errors.password = 'Escribe tu contraseña'
    } else if((!/(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})/.test(input.password))) {
      errors.password ='La contraseña es invalida'
    } 
    
    return errors
  }