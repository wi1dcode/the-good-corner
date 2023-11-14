import { Request, Response, Router } from "express";
import { Ad } from "../types/ads";
import { ads } from "../data";
const router = Router();

router.post("/create", function (req: Request, res: Response) {
  const data: Ad = req.body;
  const isAlreadyInData: boolean = ads.some((ad) => ad.id === data.id);
  if (isAlreadyInData) {
    throw new Error("Cette annonce existe déjà");
  }
  ads.push(data); 
  res.send(ads);
});

router.get("/list", function (req, res) {
  res.send(ads);
});
router.get("/find/:id", function (req, res) {
  const id = +req.params.id;
  const ad = ads.find((item) => item.id === id);
  if (!ad) {
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  }
  res.send(ad);
});

router.patch("/update/:id", function (req, res) {
  const id = +req.params.id;
  const data: Ad = req.body;

  if (!data) {
    return res
      .status(400)
      .send({ message: "Vérifiez vos informations", success: false });
  }
  const updateIndex = ads.findIndex((item) => item.id === id);
  if (updateIndex === -1) {
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  } else {
    ads[updateIndex] = { ...ads[updateIndex], ...data };

    res.send(ads[updateIndex]);
  }
});
router.delete("/delete/:id", (req, res) => {
  const id = +req.params.id;

  const index = ads.findIndex((ad) => ad.id === id);
  if (index === -1) {
    return res.status(404).send("not found");
  }
  ads.splice(index, 1);
  res.send(ads);
});


export default router;