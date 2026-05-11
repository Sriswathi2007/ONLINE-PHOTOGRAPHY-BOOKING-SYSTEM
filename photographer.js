const router = require("express").Router();
const Photographer = require("../models/Photographer");

// sample data insert
router.get("/seed", async (req, res) => {
  await Photographer.insertMany([
    {
      name: "Arjun Studios",
      location: "Chennai",
      price: 5000,
      image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993"
    },
    {
      name: "Lens Art",
      location: "Madurai",
      price: 7000,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    }
  ]);

  res.send("Seeded");
});

// get all photographers
router.get("/", async (req, res) => {
  const data = await Photographer.find();
  res.json(data);
});

module.exports = router;