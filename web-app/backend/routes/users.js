const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyFirebaseToken } = require("../middleware/auth");

// Create or update user in MongoDB after Firebase authentication
router.post("/", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.user;
    const { hasAcceptedTerms = false } = req.body;

    // Find user by Firebase UID or create a new one
    let user = await User.findOne({ uid });
    if (user) {
      user.email = email;
      user.displayName = displayName || user.displayName;
      user.photoURL = photoURL || user.photoURL;
      if (hasAcceptedTerms === true) {
        user.hasAcceptedTerms = true;
      }
    } else {
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        hasAcceptedTerms,
      });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user profile
router.get("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    console.log("Hello World!");
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const updates = req.body;
    // Prevent updating sensitive fields
    delete updates.uid;
    delete updates.email;

    if (updates.hasAcceptedTerms === false) {
      delete updates.hasAcceptedTerms;
    }

    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
