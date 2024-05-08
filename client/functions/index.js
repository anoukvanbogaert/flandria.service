const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkAdminRole = functions.https.onCall(async (data, context) => {
    // Verify the user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The user is not authenticated.');
    }

    const userId = context.auth.uid;
    const userDoc = await admin.firestore().collection('users').doc(userId).get();

    // Check if the user has an admin role
    const user = userDoc.data();
    if (user && user.role === 'admin') {
        return { message: 'User is an admin.', accessGranted: true };
    } else {
        throw new functions.https.HttpsError('permission-denied', 'The user is not an admin.');
    }
});
