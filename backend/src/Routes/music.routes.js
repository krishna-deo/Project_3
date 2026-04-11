const express = require("express");
const musicController = require("../controllers/music.controller");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");


const upload = multer({
    storage: multer.memoryStorage()
})
router.post('/upload', authMiddleware.authArtist ,upload.single("music"), musicController.createMusic)
router.post("/album", authMiddleware.authArtist, musicController.createAlbum )
module.exports= router