var passport = require('passport');
var express = require('express');
var _ = require('lodash');
var Guid = require('guid');
var router = express.Router();
var authMiddleware = require('../../auth/middleware');
var ModelLocation = require('../../models/location');
var ModelProperty = require('../../models/property');

router.route('/')
    // Query (all)
    .get(function(req, res) {
        ModelLocation.find(function(error, properties) {
            res.json(properties);
        });
    })
    // Add
    .post(authMiddleware, function(req, res) {
        req.body.safeName = req.body.name.toLowerCase().split(' ').join('-');
        req.body._id = Guid.raw();
        var location = new ModelLocation(req.body);
        location.save(function(error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json(location);
        });
    })

router.route('/:id/properties')
    // Query properties based on location (all)
    .get(authMiddleware, function(req, res) {
        ModelLocation.findOne({ _id: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                ModelProperty.find({ locationRefId: location.id },
                    function(_error, properties) {
                        if (error) {
                            res.json(error);
                            return;
                        }
                        _.forEach(properties, function(p, i) {
                            delete properties[i]._doc.body;
                        });
                        res.json(properties);
                    });
            } else {
                res.json({ info: 'not found' });
            }
        });
    });

router.route('/:id/properties/visible')
    // Query properties based on location (visible)
    .get(function(req, res) {
        ModelLocation.findOne({ _id: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                ModelProperty.find({ locationRefId: location.id, visible: true },
                    function(_error, properties) {
                        if (error) {
                            res.json(error);
                            return;
                        }
                        res.json(properties ? properties : []);
                    });
            } else {
                res.json({ info: 'not found' });
            }
        });
    });

router.route('/:id')
    // Get
    .get(function(req, res) {
        ModelLocation.findOne({ _id: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                res.json(location);
            } else {
                res.json({ info: 'not found' });
            }
        });
    })
    // Update
    .put(authMiddleware, function(req, res) {
        ModelLocation.findOne({ _id: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                _.merge(location, req.body);
                location.save(function(error) {
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
        ModelLocation.findOneAndRemove({ _id: req.params.id }, function(error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'removed' });
        });
    });

module.exports = router;
