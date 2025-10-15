const express = require('express');
const { db } = require("../services/firebase_service");
const { collection, query, where, getDocs } = require("firebase/firestore");

const router = express.Router();

// ========== GET scores by USERNAME ==========
router.get("/get/:username", async (req, res) => {
    const { username } = req.params;
    const collectionName = "scores";

    try {
        const q = query(collection(db, collectionName), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return res.status(404).send(`No documents found for username '${username}'`);
        }

        const results = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json(results);
    } catch (err) {
        console.error("Error retrieving documents:", err);
        return res.status(500).send("Error retrieving the documents");
    }
});

module.exports = router;
