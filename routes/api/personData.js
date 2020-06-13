const router = require("express").Router();
const mongoose = require("mongoose");
const Persons = require("../../models/person");
const { personValidation } = require("./validation");

// router.get("/", (req, res) => {
//   res.send("api link working");
// });

router.post("/add", async (req, res) => {
  const data = req.body;
  const result = personValidation(req.body);
  if (!result.error) {
    const person = new Persons({
      u_id: data.name + Date.now(),
      name: data.name,
      shortname: data.shortname,
      reknown: data.known,
      bio: data.bio,
      p_pic: data.shortname + ".jpg",
      t_pic: data.shortname + "_tn.jpg"
    });

    let wait = await person.save();
    res.json({ data });
  } else {
    res.status(407).json({ err: result.error.details[0].message });
  }
});

router.get("/", async (req, res) => {
  const data = await Persons.find({});
  if (data) {
    if (data.length > 0) res.json({ data });
    else res.json({ err: "No data Found" });
  } else {
    res.status(400).json({
      err: data
    });
  }
});


router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await Persons.findOne({ u_id: req.params.id });
  if (data) {
    res.json({ data });
  } else {
    res.status(400).json({
      err: data
    });
  }
});

module.exports = router;
