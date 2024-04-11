![Badge](https://img.shields.io/badge/License-MIT-yellow.svg) ![JavaScript](https://img.shields.io/badge/JavaScript-yellow) ![Node.js](https://img.shields.io/badge/Node.js-blue) ![Express.js@4.19.2](https://img.shields.io/badge/Express.js@4.19.2-pink) ![MongoDB](https://img.shields.io/badge/MongoDB-red) ![Mongoose@8.2.4](https://img.shields.io/badge/Mongoose@8.2.4-purple) ![Moment@2.30.1](https://img.shields.io/badge/Moment@2.30.1-green)

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
- [Central Grader Comments](#central-grader-comments)
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
- Moment (version 2.30.1)
- Express (version 4.19.2)
- Mongoose (version 8.2.4)

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

- Type in the following to run the database:

```
npm run seed
```

- Type in the following to run the project:

```
npm run start
```

## Screenshot

<b>Run Seed in Terminal:</b>

![](/assets/images/seed.png)

<br>

<b>Thoughts Seed in MongoDB:</b>

![](/assets/images/thoughtsSeed.png)

<br>

<b>Users Seed in MongoDB:</b>

![](/assets/images/usersSeed.png)

<br>

## Videos

A walk through video is [here](https://youtu.be/jmQXPR_38Aw).

<br>

<b> These are the commands you need to run to start the server: </b>

![](/assets/videos/StartingServer.gif)

<br>

<b> User and Friends on Insomnia: </b>

![](/assets/videos/UserFriends.gif)

<br>

<b> Thoughts and Reactions on Insomnia: </b>

![](/assets/videos/ThoughtsReaction.gif)

<br>

<b> Deletes a user by their ID and also deletes all thoughts associated with that user on Insomnia: </b>

![](/assets/videos/DeleteUserThoughts.gif)

<br>

## Output

<b>User Model</b>

- Attributes: The User model includes username, email, thoughts, and friends. Each user has a unique and required username and email, with the email field validated to match a valid email address pattern. The thoughts and friends fields store arrays of references to Thought models and User models, respectively, enabling relational data management.
- Virtuals: A virtual field friendCount dynamically calculates the number of friends a user has by returning the length of the friends array. This approach optimises data storage and retrieval efficiency, avoiding the need to store a separate count field.

<br>

<b>Thought Model</b>

- Attributes: The Thought model includes thoughtText, createdAt, username, and reactions. thoughtText must be between 1 and 280 characters. The createdAt field automatically records the time a thought was created, with a getter method to format this timestamp upon query. The username indicates who created the thought. The reactions array stores nested Reaction subdocuments.
- Virtuals: A virtual field reactionCount calculates the number of reactions to a thought, enhancing data interaction without additional storage.

<br>

<b>Reaction Schema</b>

- Defined as a subdocument schema within the Thought model, it includes fields such as reactionId, reactionBody, username, and createdAt, with the reactionId automatically generated. This setup allows for efficient storage and retrieval of reactions as part of the thoughts they relate to.

<br>

<b>API Routes</b>

- API routes facilitate the creation, retrieval, updating, and deletion of users, thoughts, and reactions, adhering to RESTful principles.
- /api/users routes support operations on users, including listing all users, fetching a single user by ID (with populated thoughts and friends data), creating, updating, and deleting users. Deleting a user also removes their associated thoughts.
- /api/users/:userId/friends/:friendId routes enable adding or removing friends from a user's friend list, showcasing the application's social networking capabilities.
- /api/thoughts routes handle thought operations similar to user routes, with additional support for creating thoughts that are automatically linked to the user who created them.
- /api/thoughts/:thoughtId/reactions routes provide for adding reactions to thoughts and deleting them, further enhancing the interactive aspect of your social network.

<br>

<b>Operational Flow</b>

- When the application is invoked, your server starts, and the defined Mongoose models are synchronised with the MongoDB database, ensuring that your API is ready to handle requests. Testing the API through tools like Insomnia demonstrates the functionality of your routes, allowing for the creation, retrieval, updating, and deletion of users, thoughts, and reactions. This confirms the API’s readiness to support a social networking application's frontend development, focusing on user interactions and data management.

<br>

The implementation forms the backbone of a social network, efficiently managing data relationships and interactions through well-defined models and API routes. This setup not only adheres to best practices in API development but also ensures scalability and maintainability of your application.

## Installation

The project was uploaded to [GitHub](https://github.com/) at the following repository:
[https://github.com/yukitoshi12345/Social-Network-API/](https://github.com/yukitoshi12345/Social-Network-API)

## Central Grader Comments

Grade: 100/100

Hello Yukitoshi,

Warmest congratulations on delivering an exceptional homework assignment! Your adeptness in crafting a comprehensive backend application utilizing Mongo, Express, and Node—and your meticulous testing of all routes with Insomnia—truly stands out.

I'm thoroughly impressed with the elegance and structure of your coding. You've made it effortless for anyone to navigate through your file system, gaining an immediate understanding of its workings. Your API's routing, the clarity in constructing your schemas, and the efficiency in handling client requests in your controllers are exemplary. The way you've configured your database with mongoose, detailed your models and schemas, and innovatively integrated 'reactions' as a subdocument in your Thought model is commendable.

Your video presentation was equally outstanding, showcasing the initiation of your server, the accessibility of routes for all users and thoughts, as well as the functionalities for creating, updating, and deleting data for thoughts and users—all verified through rigorous Insomnia testing!

Your cohesive and clean presentation of the codebase left me incredibly impressed. From the uniqueness of your repository name to your adherence to best file structure and naming conventions, and not to mention, your attention to proper coding standards like indentation, meaningful comments, and the structured arrangement of your work. Your descriptive commits and the comprehensive README file in your repository speak volumes of your diligence. Furthermore, your video was nothing short of amazing.

In sum, the proficiency and essential skills you've showcased in this assignment are pivotal for developing RESTful API architectures. These are indispensable for both backend and full-stack developers. Your capabilities in server configuration, route definition, and request-response handling form the cornerstone of scalable and effective application development. Through appropriate data modeling and database utilization, you demonstrate an acute understanding of backend data design and management. Moreover, your adeptness in API endpoint testing underscores the reliability and functionality of applications. Such skills are highly valued in the software engineering realm, as they contribute to the creation of robust, secure, and maintainable systems. Continuing to hone and broaden these skills will certainly pave your way to becoming an accomplished backend developer and a sought-after talent in full-stack development. Keep up the fantastic work!

- T.G.A. Centralized Grading.

## License

This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/Social-Network-API/blob/main/LICENSE).
