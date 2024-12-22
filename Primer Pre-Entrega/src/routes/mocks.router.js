import  express  from 'express'
import generatePets from '../mocks/generatePets.js'
import { petsService, usersService } from '../services/index.js'
import generateUsers from '../mocks/generateUsers.js'
import { CustomError } from '../utils/customErrors.js'
import { ERROR_TYPES } from '../utils/errorTypes.js'

const router = express.Router()

router.get('/mockingPets', async(req,res)=>{
    try{
        const quantity = 100;
        const generatedPets = await generatePets(quantity)

        await petsService.saveMany(generatedPets)

        res.status(200).json({
            message: `Se generaron correctamente ${quantity} mascotas`,
            pets: generatedPets
        })
        
    }
    catch (err){
        CustomError.createError(
            'PetGenerationError', 
            'Error al generar las mascotas', 
            err, 
            ERROR_TYPES.INTERNAL_SERVER_ERROR
        )
    }
})

router.get('/mockingUsers', async(req, res)=>{
    try{
        const quantity = 50;
        const generatedUsers = await generateUsers(quantity)

        await usersService.saveMany(generatedUsers)

        res.status(200).json({
            message: `Se generaron correctamente ${quantity} usuarios`,
            users: generatedUsers
        })
    }catch(err){
        CustomError.createError(
            'UserGenerationError',
            'Error al generar los usuarios', 
            err, 
            ERROR_TYPES.INTERNAL_SERVER_ERROR
        )
    }
})

router.post('/generateData', async(req, res)=>{
    try{
        const {users, pets} = req.body

        if(typeof users !== 'number' || users <= 0 || typeof pets !== 'number' || pets <= 0){
            return res.status(ERROR_TYPES.INVALID_ARGS).json({error: 'Argumentos invalidos', message: 'Users y Pets deben ser mayores a 0'})
        }

        const generatedUsers = await generateUsers(users)
        const generatedPets = await generatePets(pets)

        await usersService.saveMany(generatedUsers)
        await petsService.saveMany(generatedPets)

        res.status(200).json({
            message: `Se generaron correctamente ${users} usuarios y ${pets} mascotas.`,
            users: generatedUsers,
            pets: generatedPets
        })
        
    } catch (err) {
        CustomError.createError(
            'DataGenerationError', 
            'Error al generar la informacion', 
            err, 
            ERROR_TYPES.INTERNAL_SERVER_ERROR
        )
    }
})

export default router