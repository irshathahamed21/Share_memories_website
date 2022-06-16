import express from "express"

import { getPosts,getPost, createPost,deletePost, likePost, updatePost } from "../controllers/posts.js"

const router = express.Router()

router.get("/",getPosts)
router.get("/:id", getPost)
router.post("/", createPost)
router.patch("/:id", updatePost)
router.delete("/:id", deletePost)
router.patch("/:id", likePost)


export default router

