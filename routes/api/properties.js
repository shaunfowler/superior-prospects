var passport = require('passport');
var express = require('express');
var _ = require('lodash');
var Guid = require('guid');
var router = express.Router();
var authMiddleware = require('../../auth/middleware');
var ModelProperty = require('../../models/property');
var ModelMedia = require('../../models/media');

router.route('/')
    // Query (all)
    .get(authMiddleware, function(req, res) {
        ModelProperty.find(function(error, properties) {
            _.forEach(properties, function(p, i) {
                delete properties[i]._doc.body;
            });
            res.json(properties);
        });
    })
    // Add
    .post(authMiddleware, function(req, res) {
        var property = new ModelProperty(req.body);
        property.save(function(error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ info: 'created' });
        });
    });


router.route('/visible')
    // Query (visible)
    .get(function(req, res) {
        ModelProperty.find(function(error, properties) {
            _.forEach(properties, function(p, i) {
                delete properties[i]._doc.body;
            });
            res.json(_.filter(properties, { visible: true }));
        });
    });

router.route('/:id/media')
    // Get
    .get(function(req, res) {
        ModelProperty.findOne({ _id: req.params.id }, function(error, property) {
            if (error) {
                res.json(error);
                return;
            }

            if (property) {
                ModelMedia.find({ propertyRefId: property._doc._id }, function(_error, media) {
                    res.json(media); // media is an array
                });
            } else {
                res.json({ info: 'not found' });
            }
        });
    });

router.route('/:id')
    // Get
    .get(function(req, res) {
        ModelProperty.findOne({ _id: req.params.id }, function(error, property) {
            if (error) {
                res.json(error);
                return;
            }

            if (property) {
                res.json(property);
            } else {
                res.json({ info: 'not found' });
            }
        });
    })
    // Update
    .put(authMiddleware, function(req, res) {
        ModelProperty.findOne({ id: req.params.id }, function(error, property) {
            if (error) {
                res.json(error);
                return;
            }

            if (property) {
                _.merge(property, req.body);
                property.save(function(error) {
                    if (error) {
                        res.json({ error: error });
                        return;
                    }

                    res.json({ info: 'updated' })
                });
            } else {
                res.json({ info: 'not found' });
            }
        });
    })
    // Delete
    .delete(authMiddleware, function(req, res) {
        ModelProperty.findOneAndRemove({ id: req.params.id }, function(error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'removed' });
        });
    });

module.exports = router;
