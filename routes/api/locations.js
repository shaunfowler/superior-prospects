var passport = require('passport');
var express = require('express');
var _ = require('lodash');
var Guid = require('guid');
var router = express.Router();
var authMiddleware = require('../../authMiddleware');
var Model = require('../../models/location');
var ModelProperties = require('../../models/property');

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
        req.body.safeName = req.body.name.toLowerCase().split(' ').join('-');
        var location = new Model(req.body);
        location.save(function(error) {
            if (error) {
                res.json({ error: error });
                return;
            }
            res.json({ info: 'created' });
        });
    })

router.route('/:id/properties')
    // Query properties based on location (all)
    .get(authMiddleware, function(req, res) {
        Model.findOne({ safeName: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                ModelProperties.find({ locationRefId: location.id },
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

router.route('/:id/properties/visible')
    // Query properties based on location (visible)
    .get(function(req, res) {
        Model.findOne({ safeName: req.params.id }, function(error, location) {
            if (error) {
                res.json(error);
                return;
            }

            if (location) {
                ModelProperties.find({ locationRefId: location.id, visible: true },
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
        Model.findOne({ safeName: req.params.id }, function(error, location) {
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
        Model.findOne({ safeName: req.params.id }, function(error, location) {
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

                    res.json({ info: 'locationd' })
                });
            } else {
                res.json({ info: 'not found' });
            }
        });
    })
    // Delete
    .delete(authMiddleware, function(req, res) {
        Model.findOneAndRemove({ safeName: req.params.id }, function(error) {
            if (error) {
                res.json({ error: error })
                return;
            }
            res.json({ info: 'removed' });
        });
    });

module.exports = router;
