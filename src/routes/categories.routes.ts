import { Request, Response, Router } from "express";
import { Category } from "../types/categories";
import { categories } from "../data";

const router = Router();


router.post("/create", function (req: Request, res: Response) {
    const data: Category = req.body;
    const isAlreadyInData: boolean = categories.some((cat) => cat.id === data.id);
    if (isAlreadyInData) {
      throw new Error("Cette categorie existe déjà");
    }
    categories.push(data); 
    res.send(categories);
  });
  
  router.get("/list", function (req, res) {
    res.send(categories);
  });
  router.get("/find/:id", function (req, res) {
    const id = +req.params.id;
    const ad = categories.find((item) => item.id === id);
    if (!ad) {
      return res
        .status(404)
        .send({ message: "Categorie n'existe pas", success: false });
    }
    res.send(ad);
  });
  
  router.patch("/update/:id", function (req, res) {
    const id = +req.params.id;
    const data: Category = req.body;
  
    if (!data) {
      return res
        .status(400)
        .send({ message: "Vérifiez vos informations", success: false });
    }
    const updateIndex = categories.findIndex((item) => item.id === id);
    if (updateIndex === -1) {
      return res
        .status(404)
        .send({ message: "Categorie n'existe pas", success: false });
    } else {
      categories[updateIndex] = { ...categories[updateIndex], ...data };
  
      res.send(categories[updateIndex]);
    }
  });
  router.delete("/delete/:id", (req, res) => {
    const id = +req.params.id;
  
    const index = categories.findIndex((ad) => ad.id === id);
    if (index === -1) {
      return res.status(404).send("not found");
    }
    categories.splice(index, 1);
    res.send(categories);
  });
  

  export default router;