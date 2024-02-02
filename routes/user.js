const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update your account");
  }
});

//delete user
router.delete("/:id", async function (req, res) {
  if (req.body.userId === req.body.userId || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });
      req.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
});

//get a user

router.get("/:id", async (req, res) {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other} = user._doc
    res.status(200).json(other)
  } catch(err){
    res.status(500).json(err)
  }
})

//follow a user



//unfollow a user

module.exports = router;
