# H&M API Documentation

## Endpoints :

List of available endpoints:

- `POST /auths/login`
- `POST /auths/register`
- `POST /auths/login/google`
- `GET /users/profiles`
- `PUT /users/profiles`
- `GET /users/recommendations`
- `GET /movies/`
- `GET /movies/:id`
- `GET /movies/funFacts/:id`
- `POST /recommendations/:movieId`
- `DELETE /recommendations/:movieId`
- `GET /recommendations/users`

&nbsp;

## 1. POST /auths/login

Description:

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "acess_token"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 2. POST /auths/register

Description:

- Register user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Register Successful"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
    "message": "Email already exists"
}
```

&nbsp;

## 3. POST /auths/login/google

Description:

- Login using google account

Request:

- body:

```json
{
  "clientToken": "token"
}
```

&nbsp;

## 4. GET /users/profiles

Description:

- Get user profile

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

_Response (200 - Ok)_

```json
{
  "user": {
    "id": 1,
    "email": "wahyudi@mail.com",
    "name": "Wahyudi Aditya Pratama",
    "profilePicture": "https://i.ibb.co/TYChLWk/cat-avatar.png",
    "googleId": null,
    "Preference": {
      "id": 1,
      "favoriteGenres": "Action,commedy,rommance",
      "favoriteActors": "Christ Hamsworth, Robert Downy Jr",
      "UserId": 1
    },
    "Recomendations": [
      {
        "id": 15,
        "UserId": 1,
        "MovieId": 1156593,
        "reason": "coba1"
      },
      {
        "id": 22,
        "UserId": 1,
        "MovieId": 558449,
        "reason": "cool movie"
      },
      {
        "id": 23,
        "UserId": 1,
        "MovieId": 845781,
        "reason": "cool movie 2"
      },
      {
        "id": 24,
        "UserId": 1,
        "MovieId": 939243,
        "reason": "cool cool movie"
      }
    ]
  }
}
```

&nbsp;

## 5. PUT /users/profiles

Description:

- Update user profiles

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

- body:

```json
{
  "name": "Wahyudi Aditya Pratama",
  "favoriteGenres": "Action,commedy,rommance",
  "favoriteActors": "Christ Hamsworth, Robert Downy Jr"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update profile"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Invalid User"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name Required"
}
```

&nbsp;

## 6. GET /users/recommendations

Description:

- Get user recommendations

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

_Response (200 - OK)_

```json
[
    {
        "id": 15,
        "UserId": 1,
        "MovieId": 1156593,
        "reason": "coba1",
        "createdAt": "2025-01-02T06:48:41.402Z",
        "updatedAt": "2025-01-02T06:48:41.402Z",
        "Movie": {
            "id": 1156593,
            "title": "Your Fault",
            "genre": "Romance,Drama",
            "releaseDate": "2024-12-26T00:00:00.000Z",
            "overview": "The love between Noah and Nick seems unwavering despite their parents' attempts to separate them. But his job and her entry into college open up their lives to new relationships that will shake the foundations of both their relationship and the Leister family itself.",
            "rating": 7.4,
            "posterUrl": "https://image.tmdb.org/t/p/w500/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg",
            "backdropUrl": "https://image.tmdb.org/t/p/original/6qld2YxAO9gdEblo0rsEb8BcYKO.jpg",
            "runTime": 120,
            "createdAt": "2025-01-01T04:59:40.891Z",
            "updatedAt": "2025-01-01T04:59:40.891Z"
        }
    },
    {
        "id": 22,
        "UserId": 1,
        "MovieId": 558449,
        "reason": "cool movie",
        "createdAt": "2025-01-02T07:36:50.284Z",
        "updatedAt": "2025-01-02T07:36:50.284Z",
        "Movie": {
            "id": 558449,
            "title": "Gladiator II",
            "genre": "Action,Adventure,Drama",
            "releaseDate": "2024-11-05T00:00:00.000Z",
            "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
            "rating": 6.8,
            "posterUrl": "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
            "backdropUrl": "https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
            "runTime": 148,
            "createdAt": "2025-01-01T14:47:02.598Z",
            "updatedAt": "2025-01-01T14:47:02.598Z"
        }
    },
    ...
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Recommendations not found"
}
```

&nbsp;

## 7. GET /movies/

Description:

- Get all movies

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

Optional:

- qeuery :

```json
{
  "query": "batman",
  "page": 1
}
```

_Response (200 - OK)_

```json
{
    "page": 2,
    "results": [
        {
            "id": 175,
            "title": "The Big Blue",
            "posterUrl": "https://image.tmdb.org/t/p/w500/3t5t7yaFiTJQlqxiTkXJMFZdkh3.jpg",
            "releaseDate": "1988-05-10",
            "rating": "7.5"
        },
        {
            "id": 17101,
            "title": "Bleach the Movie: The DiamondDust Rebellion",
            "posterUrl": "https://image.tmdb.org/t/p/w500/1PV8OKvHSYvgmdVnU2wcuzQGthP.jpg",
            "releaseDate": "2007-12-22",
            "rating": "6.8"
        },
    ...,
}
```

&nbsp;

## 8. GET /movies/:id

Description:

- Get movie detail

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "movie": {
        "id": 539972,
        "title": "Kraven the Hunter",
        "genre": "Action,Adventure,Thriller",
        "releaseDate": "2024-12-11T00:00:00.000Z",
        "overview": "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
        "rating": 5.9,
        "posterUrl": "https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/original/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
        "runTime": 127,
        "createdAt": "2025-01-01T04:57:36.579Z",
        "updatedAt": "2025-01-01T04:57:36.579Z",
        "Recomendations": []
    },
    "cast": [
        {
            "adult": false,
            "gender": 2,
            "id": 27428,
            "known_for_department": "Acting",
            "name": "Aaron Taylor-Johnson",
            "original_name": "Aaron Taylor-Johnson",
            "popularity": 54.002,
            "profile_path": "/pFtHhih2XEaFaD3qOFyQW6q83br.jpg",
            "cast_id": 8,
            "character": "Sergei Kravinoff / Kraven",
            "credit_id": "60aec3f9d29bdd002c022ce0",
            "order": 0
        },
        {
            "adult": false,
            "gender": 1,
            "id": 1437491,
            "known_for_department": "Acting",
            "name": "Ariana DeBose",
            "original_name": "Ariana DeBose",
            "popularity": 16.28,
            "profile_path": "/8HTSA2iVTsDN83OncAvFTcqxsAr.jpg",
            "cast_id": 14,
            "character": "Calypso Ezili / Calypso",
            "credit_id": "621e8519f12cf4001b7f2ccf",
            "order": 1
        },
        ...
    ]
}
```

&nbsp;

## 9. GET /movies/funFacts/:id

- Get funfacts by gemini ai

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
"<div className=\"bg-gray-100 p-4 rounded-lg shadow-md\">\n  <p className=\"text-xl font-bold text-black mb-2\">Fun Fact:</p>\n  <p className=\"text-black\">Tahukah kamu bahwa film \"Your Fault\" (asumsi judul ini merujuk pada film dewasa dengan tema serupa) seringkali menampilkan plot twist tak terduga yang membuat penontonnya terkejut dan penasaran hingga akhir?</p>\n\n  <p className=\"text-xl font-bold text-black mt-4 mb-2\">Alasan Menonton:</p>\n  <p className=\"text-black\">Kalau kamu suka film dengan cerita dewasa yang berani, penuh intrik, dan eksplorasi sisi gelap hubungan manusia, maka \"Your Fault\" (jika memang merujuk pada film yang dimaksud) patut masuk daftar tontonanmu.  Film ini menawarkan pengalaman menonton yang intens dan mungkin akan memicu diskusi setelahnya.</p>\n\n  <p className=\"text-xl font-bold text-black mt-4 mb-2\">Film Serupa:</p>\n  <p className=\"text-black\">Film ini mungkin mirip dengan film-film dewasa bertema serupa yang fokus pada dinamika hubungan rumit, seperti  (sebutkan beberapa judul film dewasa yang serupa,  misalnya:  \"50 Shades of Grey\" jika temanya seputar BDSM, atau judul-judul film dengan tema perselingkuhan, manipulasi, dll.  karena saya tidak tahu pasti film \"Your Fault\" yang dimaksud).  Namun, setiap film memiliki keunikannya sendiri dalam segi penyutradaraan dan penceritaan.</p>\n\n</div>\n"
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie Not Found"
}
```

&nbsp;

## 10. POST /recommendations/:movieId

Description:

- Add movie to user recommendations

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

- params:

```json
{
  "movieId": "integer (required)"
}
```

- query:

```json
{
  "reason": "string (required)"
}
```

_Response (201 - OK)_

```json
{
  "message": "Success add movie to your recomedation"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Cannot add same movie"
}
```

&nbsp;

## 11. DELETE /recommendations/:movieId

Description:

- Delete user recommendations

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "movieId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Recommendation deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recommendation not found"
}
```

&nbsp;

## 12. GET /recommendations/users

Description:

- Get all users recommendations

Request:

- header:

```json
{ "Authorization": "Bearer <your access token>" }
```

_Response (200 - OK)_

```json
{
    "users": [
        {
            "id": 3,
            "email": "user1@mail.com",
            "name": null,
            "profilePicture": "https://i.ibb.co/TYChLWk/cat-avatar.png",
            "createdAt": "2025-01-01T17:26:47.888Z",
            "updatedAt": "2025-01-01T17:26:47.888Z",
            "Recomendations": [
                {
                    "id": 2,
                    "UserId": 3,
                    "MovieId": 1241982,
                    "reason": "col kids",
                    "createdAt": "2025-01-01T17:28:31.234Z",
                    "updatedAt": "2025-01-01T17:28:31.234Z"
                },
                {
                    "id": 3,
                    "UserId": 3,
                    "MovieId": 1005331,
                    "reason": "katanya sih bagus hehew",
                    "createdAt": "2025-01-01T17:29:40.788Z",
                    "updatedAt": "2025-01-01T17:29:40.788Z"
                },
                {
                    "id": 7,
                    "UserId": 3,
                    "MovieId": 558449,
                    "reason": "coba ges",
                    "createdAt": "2025-01-02T03:41:29.263Z",
                    "updatedAt": "2025-01-02T03:41:29.263Z"
                }
            ]
        },
        {
            "id": 5,
            "email": "zrefaxe1@gmail.com",
            "name": "zref axe",
            "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocIDngPZueHbP5dbVkzkmK68b1I2CQiW1oPGTLQwH_mKIAU6fw=s96-c",
            "createdAt": "2025-01-02T05:50:44.049Z",
            "updatedAt": "2025-01-02T05:50:44.049Z",
            "Recomendations": [
                {
                    "id": 13,
                    "UserId": 5,
                    "MovieId": 1156593,
                    "reason": "helo",
                    "createdAt": "2025-01-02T06:03:16.409Z",
                    "updatedAt": "2025-01-02T06:03:16.409Z"
                }
            ]
        },
        ...
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Users not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
