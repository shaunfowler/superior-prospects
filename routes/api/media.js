var fs = require('fs');
var path = require('path');
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
        ModelMedia.findOneAndRemove({ _id: req.params.id }, function(error, model) {
            if (error) {
                res.json({ error: error })
                return;
            }

            // Delete the item from disk
            var appDir = path.dirname(require.main.filename);
            var file = appDir + '/uploads/' + model._doc.fileName;
            fs.unlink(file, function(error) {
                if (error) {
                    console.error('Failed to delete file: ' + file);
                } else {
                    console.log('Deleted file: ' + file);
                }
            });

            res.sendStatus(204);
        });
    });

// Create dir if does not exist
function ensureExists(path, cb) {
    fs.mkdir(path, 0744, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

// File upload middleware
var uploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            var dirName = 'uploads/'; // + req.params.propertyId;
            // ensureExists(dirName, function() {
            cb(null, dirName);
            // });
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
}).single('file');

module.exports = function(app) {

    // Setup file upload route directly on 'app'
    app.post('/api/media/file/:propertyId',
        [uploadMiddleware, authMiddleware],
        function(req, res) {
            console.log('Uploading file ' + req.file.originalname
                + ' for property ' + req.params.propertyId);

            var mediaModel = new ModelMedia({
                _id: Guid.raw(),
                fileName: req.file.originalname,
                fileSize: req.file.size,
                propertyRefId: req.params.propertyId,
                type: req.file.mimetype,
                created: new Date().toISOString()
            });

            mediaModel.save(function(error) {
                if (error) {
                    res.json({ error: error });
                    return;
                }
                res.send(mediaModel);
            });
        });

    return router;
};
