const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// model:Product,
// through:ProductTag

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          
        },
      ],
    });
    res.json(allTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findOne({where:{id:req.params.id}},
      {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.json(allTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No Tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  console.log("id", req.params.id);
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No Tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
