# Take Home Challenge

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#APIs)
- [Contributing](#contributing)
- [Bestpractices](#Best-practices)
- [License](#license)


## Introduction

Welcome to our "News Online" platform! This project combines the power of React.js, Laravel, and Docker to deliver a comprehensive news aggregation experience. Users can seamlessly access the latest news articles through the React.js frontend, powered by a robust Laravel backend API that communicates seamlessly with our local database. The key highlight of this application is the integration of a third-party API to fetch real-time news, ensuring our database stays up-to-date.


## Tech Stack

- Frontend: ReactJs with TypeScript
- Backend: Laravel (for the RESTful API)
- Database: MySQL (using MySQL)

## Prerequisites

- Laravel: Version 10.x
- PHP: Version 8.2
- Node.js: Version 18.13.0

## Features
1. User Authentication and Registration
Easily manage user accounts through our secure authentication and registration system. Users can create accounts, log in, and enjoy personalized features on the platform.

2. Article Search and Filtering
Effortlessly find relevant articles with our robust search and filtering functionalities. Search through a vast database of articles, filter by categories, sources, or keywords, and access the information you need quickly.

3. Personalized News Feed
Tailor your news experience with personalized news feeds. Users can set preferences to receive a curated news feed based on their selected categories, preferred sources, and favorite authors. Enjoy a customized and relevant news stream every time you visit the platform.


## Installation

- For Docker 

1. First Time Deployment:

- Start Docker Containers: `docker-compose up -d`.
- Access PHP Container: `docker-compose exec php bash`.
- Run Composer Setup: `composer setup`.

2. Second Time Deployment:

- Start Docker Containers: `docker-compose up -d`

- For Without Docker

1. Install frontend dependencies: `npm install` in the root folder.
2. Install backend dependencies: `composer install` in the root folder.
3. Set up your MySQL Atlas database and update the `.env` files in the root directory with appropriate configuration.
4. Start the frontend development server: `npm start`
5. Start the backend server: `php artisan serve`
6. Migrate the tables into database `php artisan migrate`
7. Insert Categories into database `php artisan db:seed --class=CatetgorySeeder`
8. Commands to fetch the data from third party api
 - `php artisan fetch-news-api`
 - `php artisan nyt-news-api`
 - `php artisan news-data-api`

## Usage

This is a comprehensive API that allows developers to access articles from more than 70,000 news sources, including major newspapers, magazines, and Take-Home Challenge.
The API provides access to articles in various languages and categories, and it supports search and filtering.

## API uses
- [OpenNews](https://opennews.org) / NewsAPI.org:
- [New York Times](https://www.nytimes.com/):
- NewsData.io:

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## Best-practices
DRY(Don't Repeat Yourself),
KISS(Keep It Simple, Stupid),
SOLID(Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

