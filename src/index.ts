import User from './shopClasses/User'
import Shop from './shopClasses/Shop'

const startShopping = document.querySelector('#userForm') as HTMLFormElement
const nameField = document.querySelector('#userName') as HTMLInputElement
const ageField = document.querySelector('#userAge') as HTMLInputElement



const shopSession = new Shop()
console.log(nameField.value, parseInt(ageField.value))

startShopping.addEventListener('submit', (e)=>{
    e.preventDefault()

    const sessionUser = new User(nameField.value, parseInt(ageField.value))
    shopSession.loginUser(sessionUser)
    console.log(shopSession.myUser)
})


