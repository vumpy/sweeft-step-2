const Car = require('../models/car');

module.exports = {
    addCar: async (req,res) => {
        const {name, plate, type} = req.body;
        if(name === undefined || plate === undefined || type === undefined) {
            res.status(401).json({message: "Not enough parameters"})
        }
        else {
            try{
                const car = await Car.create({
                    name: name,
                    plate: plate,
                    type: type,
                    userid: req.user.id,
                 });
                return res.status(200).json({message: "Car added"});
            }
            catch(error) {
                console.log(error.message);
            }

            
        }
    },

    editCar: async (req, res) => {
        const {name, plate, type} = req.body;
        const id = req.params.id;

        const car = await Car.findOne({
            where:{
                id:id
            }
        });
        if(car === null) {
            return res.status(404).json({message: "Car not found"});
        }
        else {
            if(name === undefined) {
                
            }
            else {
                car.name = name;
            }
            if(plate === undefined) {
                
            }
            else {
                car.plate = plate;
            }
            if(type === undefined) {
                
            } 
            else {
                car.type = type;
            }
    
            await car.save();
            return res.status(200).json({message: "Car edited"});
        }

        
    },

    deleteCar: async (req, res) => {
        const id = req.params.id;

        const car = await Car.findOne({
            where: {
                id:id
            }
        });
            if(car === null) {
                return res.status(404).json({message: "Car not found"});
            }
            else {
                await car.destroy();
                return res.status(200).json({message: "Car deleted"});
            }    
    },
};