var passport = require('passport');
var express = require('express');
var _ = require('lodash');
var Guid = require('guid');
var router = express.Router();
var authMiddleware = require('../../authMiddleware');
var Model = require('../../models/update');

router.route('/')
    // Query (all)
    .get(function(req, res) {
        Model.find(function(error, properties) {
            res.json(properties);
        });
    })
    // Add
    .post(authMiddleware, function(req, res) {
        req.body.id = Guid.raw();
        var update = new Model(req.body);
        update.created = new Date().toString();
        update.save(function(error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ info: 'created' });
        });
    });

router.route('/:id')
    // Get
    .get(function(req, res) {
        Model.find({ id: req.params.id }, function(error, update) {
            if (error) {
                res.json(error);
                return;
            }

            if (update) {
                res.json(update);
            } else {
                res.json({ info: 'not found' });
            }
        });
    })
    // Delete
    .delete(authMiddleware, function(req, res) {
        Model.findOneAndRemove({ id: req.params.id }, function(error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'removed' });
        });
    });

module.exports = router;
