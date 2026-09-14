const express=require('express')
const router=express.Router()
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const comment = String(req.body.comment || '').trim()
        if (!comment) return res.status(400).json("Comment cannot be empty")
        const newComment=new Comment({comment, author:req.body.author, postId:req.body.postId, userId:req.userId})
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const comment = String(req.body.comment || '').trim()
        if (!comment) return res.status(400).json("Comment cannot be empty")
        const updatedComment=await Comment.findOneAndUpdate({_id:req.params.id,userId:req.userId},{$set:{comment}},{new:true})
        if (!updatedComment) return res.status(403).json("You cannot edit this comment")
        res.status(200).json(updatedComment)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        const deletedComment=await Comment.findOneAndDelete({_id:req.params.id,userId:req.userId})
        if (!deletedComment) return res.status(403).json("You cannot delete this comment")
        res.status(200).json("Comment has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})




//GET POST COMMENTS
router.get("/post/:postId",async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router