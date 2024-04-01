![Badge](https://img.shields.io/badge/License-MIT-yellow.svg) ![JavaScript](https://img.shields.io/badge/JavaScript-yellow) ![Node.js](https://img.shields.io/badge/Node.js-blue)

<h1 align = "center"> Social Network API </h1>

In the digital age, where social media platforms are the cornerstone of global communication, a startup aims to revolutionise the landscape with an advanced social network. To achieve scalability and flexibility in managing diverse and voluminous data, the startup seeks to implement an API that leverages the power of a NoSQL database. By choosing a NoSQL database, the social media startup positions itself to handle large amounts of unstructured data efficiently. This approach is essential for supporting the dynamic nature of social interactions, including posts, comments, and user profiles, thereby ensuring a seamless and responsive user experience.

The envisioned social network API is designed to be robust and user-friendly, enabling the social media platform to initiate its server and synchronise Mongoose models with the MongoDB database effortlessly. Through intuitive command executions, the API facilitates the display of users and thoughts data in well-structured JSON format via GET routes, enhancing developer convenience and data readability. Moreover, the API supports extensive functionality for user interactions, including the ability to create, update, and delete users and thoughts, as well as manage reactions and friendships through POST, PUT, and DELETE routes. This comprehensive suite of features ensures that the social network can offer a rich and interactive user experience, fostering community engagement and growth.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Test Instruction](#test-instruction)
- [Screenshot](#screenshot)
- [Videos](#videos)
- [Output](#output)
- [Installation](#installation)
- [License](#license)

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technologies Used

- JavaScript
- Node.js
- MongoDB
- Express (version 8.2.4)
- Mongoose (version 3.9.1)

## Installation Instruction

- [Install nodejs and npm](https://nodejs.org/en/download)
- [Install MongoDB](https://www.mongodb.com/docs/manual/installation/)
- [Install Insomnia](https://insomnia.rest/download)

## Test Instruction

To use this project:

- Get a copy of this repo to your local machine.
- Install the `Node Module`

```
npm install
```

- Install `Mongoose`

- Type in the following:

```
npm run seed;
```

```
npm run start;
```

## Screenshot

## Videos

## Output

## Installation

The project was uploaded to [GitHub](https://github.com/) at the following repository:
[https://github.com/yukitoshi12345/Social-Network-API/](https://github.com/yukitoshi12345/Social-Network-API)

## License

This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/Social-Network-API/blob/main/LICENSE).
