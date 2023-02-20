const express = require('express');
const { PostModel } = require('../models/Post.model')

const postRouter = express.Router();

//GET REQUEST (getting all the posts)
postRouter.get("/", async(req, res) => {
    let query = req.query;
    try {
        const post = await PostModel.find(query)
        res.send(post)
    } catch (err) {
        res.send(err)
    }
})

//POST REQUEST (posting new posts)
postRouter.post("/add", async(req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.send("New Post Added ✅")
    } catch (err) {
        console.log(err);
    }
})

//PATCH REQUEST (updating any existing post with ID)
postRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({_id:ID}, payload);
        res.send("Updated Successfully 🙂");
    }catch (err) {
        res.send(err)
    }
})

//DELETE REQUEST (deleting any unwanted post)
postRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    await PostModel.findByIdAndDelete({_id:ID})
    res.send("Deleted Successfully 🗑️")
})

module.exports = {
    postRouter
}