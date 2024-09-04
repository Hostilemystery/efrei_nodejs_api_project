# API Users

## Overview
The API allows users to retrieve all of the users of the application in micro service through a REST architecture. This API will be mainly used for registed Accounts.

It will also create own users to recover data to the platform but is in no way related to the users collected via the crawling of profiles on Social Networks.

### [POST] Create user
Allows the creation of a single user.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : POST → user/create

#### Parameters :
```javascript
{
  'firstname': String, // Optional
  'lastname': Number, // Optional
  'age': Number, // Optional
  'city': String // Optional
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

### [POST] Show user
Show an user by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : GET → user/show/:id

#### Parameters :
```javascript
{
  id: String // Required
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

### Requirements
* node 16
* npm or yarn
* git
* mongodb (please configure config.js for link mongodb)

### Install
```yarn install```

### Production mode
```yarn prod```

### Dev mode
``` yarn dev```# efrei_nodejs_api_project







Contrôleurs
AlbumController
Méthodes
getAllAlbums: Récupère tous les albums.
getAlbumById: Récupère un album par son ID.
createAlbum: Crée un nouvel album.
updateAlbum: Met à jour un album existant.
deleteAlbum: Supprime un album.
PhotoController
Méthodes
getAllPhotos: Récupère toutes les photos d'un album.
getPhotoById: Récupère une photo par son ID.
createPhoto: Crée une nouvelle photo pour un album.
updatePhoto: Met à jour une photo existante.
deletePhoto: Supprime une photo.
Routes
Albums
GET /albums: Récupère tous les albums.
GET /albums/: Récupère un album par son ID.
POST /albums: Crée un nouvel album.
PUT /albums/: Met à jour un album existant.
DELETE /albums/: Supprime un album.
Photos
GET /albums//photos: Récupère toutes les photos d'un album.
GET /albums//photos/: Récupère une photo par son ID.
POST /albums//photos: Crée une nouvelle photo pour un album.
PUT /albums//photos/: Met à jour une photo existante.
DELETE /albums//photos/: Supprime une photo.





# Documentation de l'API pour la Gestion des Albums et des Photos

## Introduction

Cette API permet de gérer les albums et les photos. Elle offre des fonctionnalités pour créer, lire, mettre à jour et supprimer des albums et des photos.

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

### Configuration du Serveur

Le serveur est configuré pour utiliser les middlewares mentionnés ci-dessus et pour se connecter à une base de données MongoDB.

---

## Modèles

## Modèles

### Album

```javascript
{
  title: String,        // Required
  description: String,  // Optional
  photos: [Object_ID]   // Array of Photo IDs, Optional
}
```
### Response :
```javascript
  {
    _id: Object_ID,
    title: String,      
    description: String,  
    photos: [Object_ID]
  }
```


### Photos

```javascript
{
  title: String,        // Required
  url: String,  // Required
  description: String,  // Optional
  album: [Object_ID]   //  Required
}
```
### Response :
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


## Exemples de Requêtes Postman

### Albums

#### GET Requests

##### Get All Albums
- **URL**: `http://localhost:<port>/albums`
- **Method**: `GET`
- **Description**: Récupère une liste de tous les albums.

##### Get Album by ID
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `GET`
- **Description**: Récupère un album spécifique par son ID.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

##### Get Album by ID (with photos)
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `GET`
- **Description**: Récupère un album spécifique par son ID, y compris ses photos.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

#### POST Requests

##### Create Album
- **URL**: `http://localhost:<port>/albums`
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

##### Create Album with Photos
- **URL**: `http://localhost:<port>/albums`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Nouvel Album avec Photos",
    "description": "Description de l'album",
    "photos": ["photoId1", "photoId2"]
  }
  ```
- **Description**: Crée un nouvel album avec des photos associées.

##### Create Album with Minimal Data
- **URL**: `http://localhost:<port>/albums`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Album Minimal",
    "description": "Description de l'album"
  }
  ```
- **Description**: Crée un nouvel album avec des données minimales.

#### PUT Requests

##### Update Album
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Album Mis à Jour",
    "description": "Description mise à jour de l'album",
    "photos": ["photoId1", "photoId2"]
  }
  ```
- **Description**: Met à jour un album existant par son ID.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

##### Update Album with Photos
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Album Mis à Jour avec Photos",
    "description": "Description mise à jour de l'album",
    "photos": ["photoId1", "photoId2"]
  }
  ```
- **Description**: Met à jour un album existant par son ID, y compris ses photos.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

##### Update Album with Minimal Data
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Album Minimal Mis à Jour"
  }
  ```
- **Description**: Met à jour un album existant par son ID avec des données minimales.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

#### DELETE Requests

##### Delete Album
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `DELETE`
- **Description**: Supprime un album par son ID.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

##### Delete Album with Photos
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `DELETE`
- **Description**: Supprime un album par son ID, y compris ses photos.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

##### Delete Album with Minimal Data
- **URL**: `http://localhost:<port>/albums/:id`
- **Method**: `DELETE`
- **Description**: Supprime un album par son ID avec des données minimales.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca`

---

### Photos

#### GET Requests

##### Get All Photos for an Album
- **URL**: `http://localhost:<port>/albums/:albumId/photos`
- **Method**: `GET`
- **Description**: Récupère toutes les photos d'un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos`

##### Get Photo by ID
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `GET`
- **Description**: Récupère une photo spécifique par son ID pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

##### Get Photo by ID (with album context)
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `GET`
- **Description**: Récupère une photo spécifique par son ID pour un album spécifique, en tenant compte du contexte de l'album.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

#### POST Requests

##### Create Photo
- **URL**: `http://localhost:<port>/albums/:albumId/photos`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Nouvelle Photo",
    "url": "http://example.com/photo.jpg",
    "description": "Description de la photo"
  }
  ```
- **Description**: Crée une nouvelle photo pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos`

##### Create Photo with Minimal Data
- **URL**: `http://localhost:<port>/albums/:albumId/photos`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo Minimale",
    "url": "http://example.com/photo.jpg"
  }
  ```
- **Description**: Crée une nouvelle photo avec des données minimales pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos`

##### Create Photo with Additional Data
- **URL**: `http://localhost:<port>/albums/:albumId/photos`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo avec Données Supplémentaires",
    "url": "http://example.com/photo.jpg",
    "description": "Ceci est une photo avec des données supplémentaires"
  }
  ```
- **Description**: Crée une nouvelle photo avec des données supplémentaires pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos`

#### PUT Requests

##### Update Photo
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo Mise à Jour",
    "url": "http://example.com/updated-photo.jpg",
    "description": "Description mise à jour de la photo"
  }
  ```
- **Description**: Met à jour une photo existante par son ID pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

##### Update Photo with Minimal Data
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo Minimale Mise à Jour"
  }
  ```
- **Description**: Met à jour une photo existante par son ID avec des données minimales pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

##### Update Photo with Additional Data
- **URL**: `http://localhost:<port

>/albums/:albumId/photos/:photoId`
- **Method**: `PUT`
- **Headers**: 
  - `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Photo avec Données Supplémentaires Mise à Jour",
    "url": "http://example.com/updated-photo.jpg",
    "description": "Ceci est une photo mise à jour avec des données supplémentaires"
  }
  ```
- **Description**: Met à jour une photo existante par son ID avec des données supplémentaires pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

#### DELETE Requests

##### Delete Photo
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `DELETE`
- **Description**: Supprime une photo par son ID pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

##### Delete Photo with Minimal Data
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `DELETE`
- **Description**: Supprime une photo par son ID avec des données minimales pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`

##### Delete Photo with Additional Data
- **URL**: `http://localhost:<port>/albums/:albumId/photos/:photoId`
- **Method**: `DELETE`
- **Description**: Supprime une photo par son ID avec des données supplémentaires pour un album spécifique.
- **Example**: `http://localhost:<port>/albums/60d0fe4f5311236168a109ca/photos/60d0fe4f5311236168a109cb`


