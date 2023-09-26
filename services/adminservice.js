const Zone = require("../models/zone");
const User = require("../models/user");
const History = require('../models/history');
const {checkadmin} = require('../middleware/jwtauthen');

module.exports = {
    addZone: async(req,res) => {
        if(checkadmin) {
            const {name, address, fair} = req.body;

            if(name === undefined || address === undefined || fair === undefined) {
                res.status(401).json({message: "Not enough parameters"})
            }
            else {
                const zone = await Zone.create({
                    name:name,
                    address:address,
                    fair:fair,
                });
                return res.status(200).json({message: "Zone added"});
            }
        }
        else {
            return res.status(403).json({message: "Admin permission needed"});
        }
        
    },

    editZone: async (req, res) => {
        if(checkadmin) {
            const {name, address, fair} = req.body;
            const id = req.params.id;

            const zone = await Zone.findOne({
                where:{
                    id:id
                }
            });
            if(zone === null) {
                return res.status(404).json({message: "Zone not found"});
            }
            else {
                if(name === undefined) {
                
                }
                else {
                    zone.name = name;
                }
                if(address === undefined) {
                
                }
                else {
                    zone.address = address;
                }
                if(fair === undefined) {
                
                } 
                else {
                    zone.fair = fair;
                }
    
            await zone.save();
            return res.status(200).json({message: "Zone edited"});
        }
        }
        
    },

    deleteZone: async (req, res) => {
        const id = req.params.id;

        const zone = await Zone.findOne({
            where: {
                id:id
            }
        });
            if(zone === null) {
                return res.status(404).json({message: "Zone not found"});
            }
            else {
                await zone.destroy();
                return res.status(200).json({message: "Zone deleted"});
            }    
    },

    seeAll: async (req,res) => {
        if(checkadmin) {
            Zone.findAll({
                include: [{
                    model: History,
                    as: 'zonehistory',
                    // required:true
                }]
            }).then(zone => {
                res.status(200).json(zone);
            })
        }
    }

}