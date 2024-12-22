import { faker } from '@faker-js/faker'

const generatePets = async (quantity) =>{
    const pets = []

    for(let i=0; i<quantity; i++){
        const petName = faker.person.firstName()
        const petSpecie = faker.helpers.arrayElement(['dog', 'cat'])
        const adopted = false
        const owner = null

        const pet = {
            _id: faker.database.mongodbObjectId(),
            name: petName,
            specie: petSpecie,
            adopted: adopted,
            owner: owner,
        }

        pets.push(pet)
    }

    return pets
}

export default generatePets