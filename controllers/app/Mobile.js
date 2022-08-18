const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SERVICE_ID = process.env.SERVICE_ID;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

exports.Otp = (req, res) => {
// client.verify
//     .services(SERVICE_ID)
//     .verifications.create({
//         to: req.body.phone,
//         channel: 'sms',
//     })
//     .then(result => {
//         console.log(result)
//         res.json({
//             status :true,
//             code:200,
//         })
//     }).catch(err =>{
//         console.log(err)
//         res.json({
//             status :false,
//             code:403,
//         })
//     })
     res.json({
            status :true,
            code:200,
        })
};
  
exports.Verify = (req, res) => {
// client.verify
//     .services(SERVICE_ID)
//     .verificationChecks.create({
//         to: req.body.phone,
//         code: req.body.code,
//     })
//     .then(result => {
//         console.log(result)
//         if(result.valid){
//             res.json({
//                 status :true,
//                 code:200,
//             })
//         }else{
//             res.json({
//                 status :false,
//                 code:403,
//             })
//         }
        
//     }).catch(err => {
//         console.log(err)
//     })
     res.json({
            status :true,
            code:200,
        })
};    
