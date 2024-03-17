// About this function (video 18)
// https://www.youtube.com/watch?v=4wa3CMK4E2Y&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=18
// I wasn't able to deploy Shaun's version of this function
// So I reviewed the firebase documentation and asked some ressources
// This is what I came back with; despite the fact it looks different it does exactly the same

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// We will call this function from the UI with the email in data
exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user
  return admin.auth().getUserByEmail(data.email)
    .then((user) => {
      // then add the custom claim
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    })
    .then(() => {
      // then return a response to the user
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    })
    .catch((error) => {
      return error
    })
})






// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.updateAdminClaim = functions.https.onRequest((req, res) => {
//   const email = req.query.email;
//   const addClaim = req.query.addClaim === 'true';

//   if (!email) {
//     res.status(400).send('Missing email parameter');
//     return;
//   }

//   admin.auth().getUserByEmail(email)
//     .then((user) => {
//       if (user) {
//         if (addClaim) {
//           user.customClaims = { admin: true };
//         } else {
//           user.customClaims = {};
//         }
//         return admin.auth().setCustomUserClaims(user.uid, user.customClaims);
//       } else {
//         throw new Error('User not found');
//       }
//     })
//     .then(() => {
//       res.status(200).send('Custom claim updated');
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error updating custom claim');
//     });
// });