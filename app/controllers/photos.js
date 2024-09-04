const PhotoModel = require('../models/photo');
const AlbumModel = require('../models/album');

const Photos = class Photos {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   */
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  /**
   * Get all photos
   */
  getAllPhotos() {
    this.app.get('/albums/:albumId/photos', async (req, res) => {
      try {
        const photos = await this.PhotoModel.find({ album: req.params.albumId });
        res.status(200).json(photos);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Get photo by id
   */
  getPhotoById() {
    this.app.get('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findOne({ _id: req.params.photoId, album: req.params.albumId });
        if (!photo) return res.status(404).json({ message: 'Photo Not Found!' });
        res.status(200).json(photo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Create photo
   */
  createPhoto() {
    this.app.post('/albums/:albumId/photos', async (req, res) => {
      const photo = new this.PhotoModel({
        ...req.body,
        album: req.params.albumId
      });
      try {
        const newPhoto = await photo.save();
        await this.AlbumModel.findByIdAndUpdate(req.params.albumId, { $push: { photos: newPhoto._id } });
        res.status(201).json(newPhoto);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }

  /**
   * Update photo
   */
  updatePhoto() {
    this.app.put('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const updatedPhoto = await this.PhotoModel.findOneAndUpdate(
          { _id: req.params.photoId, album: req.params.albumId },
          req.body,
          { new: true }
        );
        if (!updatedPhoto) return res.status(404).json({ message: 'Photo Not Found!' });
        res.status(200).json(updatedPhoto);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }

  /**
   * Delete photo
   */
  deletePhoto() {
    this.app.delete('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findOneAndDelete({ _id: req.params.photoId, album: req.params.albumId });
        if (!photo) return res.status(404).json({ message: 'Photo Not Found!' });
        await this.AlbumModel.findByIdAndUpdate(req.params.albumId, { $pull: { photos: photo._id } });
        res.status(200).json({ message: 'Photo deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Run
   */
  run() {
    this.getAllPhotos();
    this.getPhotoById();
    this.createPhoto();
    this.updatePhoto();
    this.deletePhoto();
  }
};

module.exports = Photos;
