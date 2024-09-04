# NANJI ENGA Gedeon Freddy
---

# Documentation de l'API pour la Gestion des Albums et des Photos

## Introduction

Cette API permet de gérer les albums et les photos. Elle offre des fonctionnalités pour créer, lire, mettre à jour et supprimer des albums et des photos. Elle nous permetra egalement de joindre chaque photos a une album

---

## Configuration

### Dépendances

- **Express**: Framework web pour Node.js.
- **Mongoose**: ODM pour MongoDB.
- **JWT**: JSON Web Tokens pour l'authentification.
- **Body-Parser**: Middleware pour analyser les corps des requêtes.
- **Compression**: Middleware pour compresser les réponses.
- **Cors**: Middleware pour activer CORS.
- **Helmet**: Middleware pour sécuriser les en-têtes HTTP.

### Prérequis
- **node 16**
- **npm or yarn**
- **git**
- **mongodb** (Modifier le fichier config.js en y ajoutant le lien de  mongodb)

### Configuration du Serveur

Le serveur est configuré pour  se connecter à une base de données MongoDB et effectuer nos differente requete dans celle ci.

---


## Modèles

### Album

#### parametre
```javascript
{
  title: String,        // Required
  description: String,  // Optional
  photos: [Object_ID]   // Array of Photo IDs, Optional
}
```
#### Response :
```javascript
  {
    _id: Object_ID,
    title: String,      
    description: String,  
    photos: [Object_ID]
  }
```


### Photos
#### parametre
```javascript
{
  title: String,        // Required
  url: String,  // Required
  description: String,  // Optional
  album: [Object_ID]   //  Required
}
```
#### Response :
```javascript
  {
    _id: Object_ID,
    title: String,       
    url: String,  
    description: String, 
    album: [Object_ID] 
  }
```

## Contrôleurs

### AlbumController

#### Méthodes

- **getAllAlbums**: Récupère tous les albums.
- **getAlbumById**: Récupère un album par son ID.
- **createAlbum**: Crée un nouvel album.
- **updateAlbum**: Met à jour un album existant.
- **deleteAlbum**: Supprime un album.

### PhotoController

#### Méthodes

- **getAllPhotos**: Récupère toutes les photos d'un album.
- **getPhotoById**: Récupère une photo par son ID.
- **createPhoto**: Crée une nouvelle photo pour un album.
- **updatePhoto**: Met à jour une photo existante.
- **deletePhoto**: Supprime une photo.

---

## Routes

### Albums

- **GET /albums**: Récupère tous les albums.
- **GET /albums/:id**: Récupère un album par son ID.
- **POST /albums**: Crée un nouvel album.
- **PUT /albums/:id**: Met à jour un album existant.
- **DELETE /albums/:id**: Supprime un album.

### Photos

- **GET /albums/:id/photos**: Récupère toutes les photos d'un album.
- **GET /albums/:id/photos/:photoId**: Récupère une photo par son ID.
- **POST /albums/:id/photos**: Crée une nouvelle photo pour un album.
- **PUT /albums/:id/photos/:photoId**: Met à jour une photo existante.
- **DELETE /albums/:id/photos/:photoId**: Supprime une photo.

---

## Exemples de Requêtes Postman

### Albums

#### GET Requests

###### Get All Albums
- **URL**: `http://localhost:3000/albums`
- **Method**: `GET`
- **Description**: Récupère une liste de tous les albums.

###### Get Album by ID
- **URL**: `http://localhost:3000/albums/:id`
- **Method**: `GET`
- **Description**: Récupère un album spécifique par son ID, y compris ses photos.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19`

#### POST Requests

###### Create Album
- **URL**: `http://localhost:3000/albums`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Nouvel Album",
    "description": "Description de l'album",
    "photos": []
  }

  ```
- **Description**: Crée un nouvel album.

#### PUT Requests

###### Update Album
- **URL**: `http://localhost:3000/albums/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Album Mis à Jour",
    "description": "Description mise à jour de l'album"
  }
  ```
- **Description**: Met à jour un album existant par son ID.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19`


#### DELETE Requests

###### Delete Album
- **URL**: `http://localhost:3000/albums/:id`
- **Method**: `DELETE`
- **Description**: Supprime un album par son ID.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19/`

### Photos

#### GET Requests

###### Get All Photos for an Album
- **URL**: `http://localhost:3000/albums/:albumId/photos`
- **Method**: `GET`
- **Description**: Récupère toutes les photos d'un album spécifique.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19/photos/`

###### Get Photo by ID
- **URL**: `http://localhost:3000/albums/:albumId/photos/:photoId`
- **Method**: `GET`
- **Description**: Récupère une photo spécifique par son ID pour un album spécifique.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19/photos/66d81427d8c615f0bf178624`

#### POST Requests

###### Create Photo
- **URL**: `http://localhost:3000/albums/:albumId/photos`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo",
    "url": "https://th.bing.com/th/id/OIP.63CH3dbDu9J19uuuUXMsvgHaEo?rs=1&pid=ImgDetMain",
    "description": "Ceci est une photo "
  }
  ```
- **Description**: Crée une nouvelle photo avec des données supplémentaires pour un album spécifique.
- **Example**: `http://localhost:3000/albums/60d0fe4f5311236168a109ca/photos`

#### PUT Requests

###### Update Photo
- **URL**: `http://localhost:3000/albums/:albumId/photos/:photoId`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo Mise à Jour",
    "url": "https://th.bing.com/th/id/OIP.63CH3dbDu9J19uuuUXMsvgHaEo?rs=1&pid=ImgDetMain",
    "description": "Met à jour une photo existante par son ID pour un album spécifique."
  }
  ```

#### DELETE Requests

###### Delete Photo
- **URL**: `http://localhost:3000/albums/:albumId/photos/:photoId`
- **Method**: `DELETE`
- **Description**: Supprime une photo par son ID pour un album spécifique.
- **Example**: `http://localhost:3000/albums/66d812dcb1bf95d3def0ce19/photos/66d81427d8c615f0bf178624`


