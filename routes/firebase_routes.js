const express = require('express');
const db = require("../services/firebase_service");

const router = express.Router();

// ========== GET scores by USERNAME ==========
router.get("/get/:username", async (req, res) => {
    const { username } = req.params;
    const collectionName = "scores";

    try {
        const snapshot = await db
            .collection(collectionName)
            .where("username", "==", username)
            .get();

        if (snapshot.empty) {
            return res.status(404).send(`No documents found for username '${username}'`);
        }

        const results = snapshot.docs.map((doc) => ({
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
