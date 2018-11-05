const Boom = require('boom');

const models = [
    {
        nic: '1234567890123',
        name: 'Umar',
        constituency: 'Gulshan',
        gender: 'Male',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '2345678901234',
        name: 'Hamza',
        constituency: 'Johar',
        gender: 'Male',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '3456789012345',
        name: 'Farrukh',
        constituency: 'Defense',
        gender: 'Male',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '4567890123456',
        name: 'Aamir',
        constituency: 'Gulshan',
        gender: 'Male',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '5678901234567',
        name: 'Sumail',
        constituency: 'Hyderi',
        gender: 'Male',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '6789012345678',
        name: 'Shumaila',
        constituency: 'Johar',
        gender: 'Female',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '7890123456789',
        name: 'Samra',
        constituency: 'Defense',
        gender: 'Female',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '8901234567890',
        name: 'Sehar',
        constituency: 'Johar',
        gender: 'Female',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '9012345678901',
        name: 'Safa',
        constituency: 'Hyderi',
        gender: 'Female',
        dob: new Date(1980, 1, 1)
    },
    {
        nic: '0123456789012',
        name: 'Sehar',
        constituency: 'Malir',
        gender: 'Female',
        dob: new Date(1980, 1, 1)
    },
];

async function findNational(ctx) {
    
    let result = null;
    
    for(let a=0;a<models.length;a++)
    {
        if(models[a].nic === ctx.params.nic)
        {
            result  = models[a];
            break;
        }
    }
    
    if (!result) {
        throw Boom.notFound('NIC does not Exist');
    }
    ctx.body = result;
}

module.exports.findNational = findNational;
