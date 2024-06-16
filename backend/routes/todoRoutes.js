import express from "express";
import { 
  showAll,
  show,
  create,
  update,
  destroy
} from "../controllers/todoController.js";
import { checkIfAuthenticated } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get('/all', checkIfAuthenticated, showAll);
router.get('/:id', checkIfAuthenticated, show);
router.post('/create', checkIfAuthenticated, create);
router.put('/update', checkIfAuthenticated, update);
router.delete('/delete', checkIfAuthenticated, destroy);

export default router;