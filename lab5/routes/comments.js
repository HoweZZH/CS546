const express = require('express');
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;

router.get("/",(req,res)=>{
    res.status(200).send("comments root");
});
router.get("/recipe",(req,res)=>{
    res.status(200).send("recipe root");
});
router.get("/recipe/:recipeId", (req, res) => {
    commentsData.getCommentsByRecipeId(req.params.recipeId).then((comments) => {
        res.json(comments);
    }).catch((e) => {
        console.log(e);
        res.status(404).json({ error: "recipe not found" });
    }); 
});
router.get("/:commentId", (req, res) => {
    commentsData.getCommentById(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch((e) => {
        res.status(404).json({ error: "comment not found" });
    });
}); 
//Creates a new comment for the specified recipe 
router.post("/:recipeId", (req, res) => {
    let newComment = req.body;
    if (!newComment) {
        res.status(400).json({ error: "You must provide a comment" });
        return;
    }
    if (!newComment.poster) {
        res.status(400).json({ error: "You must provide a poster in comment" });
        return;
    }
    if (!newComment.comment) {
        res.status(400).json({ error: "You must provide a comment content in comment" });
        return;
    }
    commentsData.addOneComment(req.params.recipeId,newComment)
        .then((newComment) => {
            //console.log(newComment);
            res.json(newComment);
        }).catch(() => {
            res.status(404).json({ error: "recipe not found"});
        });
});
router.put("/:recipeId/:commentId", (req, res) => {
    console.log("put!");
    let updatedComment = req.body;
    if(!updatedComment){
        res.status(400).json({ error: "You must provide a comment" });
    }
    if(!updatedComment.poster && !updatedComment.name&& !updatedComment.comment ){
        res.status(400).json({ error: "You must either provide a poster Or name Or comment in the comment obj" });
    };
    let getComment = commentsData.getCommentById(req.params.commentId);

    getComment.then(() => {
        return commentsData.updateComment(req.params.recipeId,req.params.commentId, updatedComment)
            .then((updatedComment) => {
                console.log("update comment!")
                res.json(updatedComment);
            }).catch(() => {
                res.status(500).json({ error: "update comment error" });
            });
    }).catch(() => {
        res.status(404).json({ error: "Comment not found" });
    });  
});
router.delete("/:id", (req, res) => {
    let getComment = commentsData.getCommentById(req.params.id);
    getComment.then(() => {
        return commentsData.removeComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(404).json({ error: e });
            });
    }).catch(() => {
        res.status(500).json({ error: "Comment not found"});
    });
});
module.exports = router;