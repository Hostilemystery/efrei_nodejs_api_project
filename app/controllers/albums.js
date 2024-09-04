const AlbumModel = require('../models/album');

const Albums = class Albums {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   */
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  /**
   * Get all albums
   */
  getAllAlbums() {
    this.app.get('/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find().populate('photos');
        res.status(200).json(albums);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });
  }

  /**
   * Get album by id
   */
  getAlbumById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id).populate('photos');
        if (!album) return res.status(404).json({ message: 'Album Not Found' });
        res.status(200).json(album);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Create album
   */
  createAlbum() {
    this.app.post('/albums', async (req, res) => {
      const album = new this.AlbumModel(req.body);
      try {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }

  /**
   * Update album
   */
  updateAlbum() {
    this.app.put('/albums/:id', async (req, res) => {
      try {
        const updatedAlbum = await this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAlbum) return res.status(404).json({ message: 'Album not found' });
        res.status(200).json(updatedAlbum);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }

  /**
   * Delete album
   */
  deleteAlbum() {
    this.app.delete('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findByIdAndDelete(req.params.id);
        if (!album) return res.status(404).json({ message: 'Album not found' });
        res.status(200).json({ message: 'Album deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Run
   */
  run() {
    this.getAllAlbums();
    this.getAlbumById();
    this.createAlbum();
    this.updateAlbum();
    this.deleteAlbum();
  }
};

module.exports = Albums;
