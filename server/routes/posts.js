import express from "express"

import { getPosts,getPost, createPost } from "../controllers/posts"

const router = express.Router()

router.get("/posts",getPosts)
router.get("./posts/id", getPost)
router.post("/posts", createPost)
