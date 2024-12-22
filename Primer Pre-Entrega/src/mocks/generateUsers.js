import { faker } from '@faker-js/faker'
import { createHash } from '../utils/index.js'

const generateUsers = async (quantity) =>{
    const users = []

    for(let i=0; i<quantity; i++){
        const first_name = faker.person.firstName()
        const last_name  = faker.person.lastName()
        const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@gmail.com`
        const password   = 'coder123'
        const role       = faker.helpers.arrayElement(['admin', 'user'])
        const pets       = []

        const hashedPassword = await createHash(password)

        const user = {
            _id: faker.database.mongodbObjectId(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            role: role,
            pets: pets
        }

        users.push(user)
    }

    return users
}

export default generateUsers