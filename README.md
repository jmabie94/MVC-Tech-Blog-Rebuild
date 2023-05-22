# 3-23-23-MVC-Tech-Blog-REBUILD

## Description

#### Attempt to refactor and repair Module 14's MVC Tech Blog challenge, starting over almost entirely. In order to spruce up the approach, I made all of the functions identical to what they would be for a "Tech" blog, but changed the seeds, design and demo posts to instead match a Simpsons theme (just for fun).

---

## Contents

- [User Story](#user-story)
- [Installation](#installation)
- [Media](#media)
- [Credits](#credits)
- [Technology Used](#technology-used)
- [License](#license)
  ​

### User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Installation:

Utilizing the Application is simple!

Option A - Use the Heroku deployment directly by way of (heroku link).

Option B - Clone the repo:

    git clone git@github.com:jmabie94/MVC-Tech-Blog-Rebuild.git

Next, open an integrated terminal in your cloned folder and do the following:

    run "npm init -y"
    run "npm i"

After Node Packages have installed, open your MySQL:

    mysql -u root -p (enter your password when prompted)
    SOURCE db/schema.sql
    exit

Now that your database has been initialized, seed the database with the Simpsons stuff:

    run "npm run seed"

Your database is now fully seeded and you can start your application:

    run "npm run start"

Finally, navigate to http://localhost:3001 to utilize the website!
​

## Media

### Homepage:

![First Screenshot]()

### Dashboard:

![Second Screenshot]()

### Write New Post:

![Third Screenshot]()

### Write New Comment:

![Fourth Screenshot]()

### User Directory:

![Fifth Screenshot]()
​

## Credits

- Jack Mabie (https://github.com/jmabie94)
  ​

## Technology Used

    - Javascript
    - MySQL
    - Sequelize
    - Express-Handlebars
    - Regexes
    - Heroku
    - MVC
    - Dotenv
    - Bcrpyt

## License

​
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
​
MIT License
Copyright (c) [2023] [The Five Loopers]
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
​

---
