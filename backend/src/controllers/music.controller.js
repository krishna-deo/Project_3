const {uploadFile} = require("../sevices/storage.service")
const jwt = require("jsonwebtoken");
const musicModel = require("../Models/music.model");
const albumModel = require("../Models/album.model")

async function createMusic(req,res) {
        const {title}= req.body;
        const file= req.file;

        const result = await uploadFile(file.buffer.toString("base64"))
        const music = await musicModel.create({
            uri: result.url,
            title ,
            artist: req.user.id,
        })

        return res.status(201).json({
            message:"Music created successfuly",
            music:{
                id: music._id,
                uri:music.uri,
                title: music.title,
                artist: music.artist,
            }
        })
}

async function createAlbum(req, res) {
        const {title, musics} = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            music: musics
        })

        res.status(201).json({
            message: "Album created successfully",
            ablum: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music,
            }
        })
}
module.exports = {createMusic, createAlbum}