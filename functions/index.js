const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// We will call this function from the UI with the email in data
exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return {error: 'Only admins can set new admins'}
  }

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