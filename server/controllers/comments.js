const { param } = require('../app');
const Comment = require('../models/comments');

exports.getAllComments = async (req, res) => {
    try {
        const data = await Comment.find();
        if (data && data.length !== 0) {
            return res.status(200).send({
                message: "Comments retrieved successfully",
                payload: data
            })
        }
        res.status(404).send({
            message: "No comments found!",
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.getCommentById = async (req, res) => {
    try {
        const data = await Comment.findById(req.params.id);
        if (data) {
            return res.status(200).send({
                message: "Comment retrieved successfully",
                payload: data
            })
        }
        res.status(404).send({
            message: "No comment found!",
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.createComment = async (req, res) => {
    try {
        const data = new Comment({
            comment: req.body.comment
        });
        const result = await data.save();
        if(result) {
            return res.status(201).send({
                message: "Comment created successfully",
                payload: result
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.updateComment = async (req, res) => {
    try {
        const data = ({
            comment: req.body.comment
        });
        const result = await Comment.findByIdAndUpdate(req.params.id, data);
        if(result) {
            return res.status(200).send({
                message: "Comment updated successfully",
                payload: result
            });
        }
        res.status(500).send({
            message: "No comment updated!",
        });
    } catch (err) {
        res.status(500).send(err);
    }
 };
exports.deleteComment = async (req, res) => {
    try {
        const result = await Comment.findByIdAndUpdate(req.params.id, data);
        if(result) {
            return res.status(200).send({
                message: "Comment deleted successfully",
                payload: result
            });
        }
        res.status(500).send({
            message: "No comment deleted!",
        });
    } catch (err) {
        res.status(500).send(err);
    }
 };