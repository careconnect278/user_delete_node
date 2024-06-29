const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(400).send("Please send a POST request");
  }

  // Get the user ID from the request body
  const uid = req.body.uid;

  if (!uid) {
    return res.status(400).send("No user ID provided");
  }

  try {
    // Delete the user
    await admin.auth().deleteUser(uid);
    return res.status(200).send(`Successfully deleted user with ID: ${uid}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send("Error deleting user");
  }
});
