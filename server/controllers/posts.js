import express from "express"
import mongoose from "mongoose"

import PostMessage from "../models/posts.js";

const router = express.Router()

export const getPosts = async(req,res) => {

    try {
        const posts = await PostMessage.find()

        return res.status(200).json(posts)


    }
    catch(error){

        return res.status(404).json({message:error.message})

    }
}

export const getPost = async(req,res) => {

    const {id} = req.params
    try {

        const post = await PostMessage.findById(id)

        return res.status(200).json(post)


    }
    catch(error){

        return res.status(404).json({message:error.message})

    }
}

export const createPost = async(req,res) => {

    const {title,message,selectedFile, creator, tags} = req.body

    const newPostMessage = new PostMessage({title,message,selectedFile, creator, tags})
    
    try {
            await newPostMessage.save()
            res.status(201).json(newPostMessage );
        
        

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router

export const updatePost = async(req,res) => {

    const {id} = req.params

    const { title, message, creator, selectedFile, tags } = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedPost = {title, message, creator, selectedFile, tags, _id:id}
    await PostMessage.findByIdAndUpdate(id,updatedPost, {new:true} )
    
    res.status(201).json(updatedPost)
    
   
    
}


