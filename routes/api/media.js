var passport = require('passport');
var express = require('express');
var _ = require('lodash');
var Guid = require('guid');
var multer = require('multer');
var router = express.Router();
var authMiddleware = require('../../auth/middleware');
var ModelMedia = require('../../models/media');

router.route('/')
    // Query (all)
    .get(function(req, res) {
        ModelMedia.find(function(error, properties) {
            res.json(properties);
        });
    })
    // Add
    .post(authMiddleware, function(req, res) {
        var media = new ModelMedia(req.body);
        media.save(function(error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.sendStatus(201);
        });
    });

router.route('/:id')
    // Get
    .get(function(req, res) {
        ModelMedia.findOne({ _id: req.params.id }, function(error, media) {
            if (error) {
                res.json(error);
                return;
            }

            if (media) {
                res.json(media);
            } else {
                res.sendStatus(404);
            }
        });
    })
    // Update
    .put(authMiddleware, function(req, res) {
        ModelMedia.findOne({ _id: req.params.id }, function(error, media) {
            if (error) {
                res.json(error);
                return;
            }

            if (media) {
                _.merge(media, req.body);
                media.save(function(error) {
                    if (error) {
                        res.json({ error: error });
                        return;
                    }
                    res.sendStatus(204);
                });
            } else {
                res.sendStatus(404);
            }
        });
    })
    // Delete
    .delete(authMiddleware, function(req, res) {
        ModelMedia.findOneAndRemove({ _id: req.params.id }, function(error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.sendStatus(204);
        });
    });

module.exports = function(app) {

    // File upload middleware
    var uploadMiddleware = multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'app/uploads/');
            },
            filename: function(req, file, cb) {
                cb(null, file.originalname);
            }
        })
    }).single('file');

    // Setup file upload route directly on 'app'
    app.post('/api/media/file/:propertyId',
        uploadMiddleware, // TODO - auth middleware?
        function(req, res) {
            console.log('Uploading file ' + req.file.originalname
                + ' for property ' + req.params.propertyId);
            res.sendStatus(201);
        });

    return router;
};
