class User {
    
    constructor() {
        this._firstName ="";
        this._lastName = "";
        this._email = "";
        this._password = "";        
    }

    setFisrstName(firstName) {
        this._firstName = firstName;
    }

    getFirstName() {
        return this._firstName;
    }

    setLastName(lastName) {
        this._lastName = lastName;
    }
    
    getLastName() {
        return this._lastName;
    }

    setEmail(email) {
        this._email = email;
    }

    getEmail() {
        return this._email;
    }
    
    setPassword(password){
        this._password = password;
    }

    getPassword() {
        return this._password;
    }
}
module.exports = User;