import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js"


const router = Router()
// localhost:3000/movies
router.get('/new', moviesCtrl.new)
router.get('/', moviesCtrl.index)
router.get('/:movieId', moviesCtrl.show)
router.get('/:movieId/edit', moviesCtrl.edit)
router.post("/", moviesCtrl.create)
router.delete("/:movieId", moviesCtrl.delete)
router.put("/:movieId", moviesCtrl.update)
export {
  router
}
