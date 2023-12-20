# Give A Paw (Дай лапа) - Pet Adoption Platform

Give A Paw, a comprehensive pet adoption platform that aims to connect pets with loving homes. This project is the result of extensive research, analysis, and individual exploration of various technologies and approaches, including microservices architecture, event-driven architecture, content-based filtering algorithms, and more.

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Back-end development](#backend)
4. [Front-end development](#frontend)
5. [Recommendation Engine](#recommendation-engine)
6. [Infrastructure](#infrastructure)
7. [Prerequisites](#prerequisites)
8. [Running the Application](#running-the-application)
9. [Tests](#tests)
10. [Deployment](#deployment)
11. [Contribution](#contribution)

## Introduction

Give A Paw is a full-stack application designed to facilitate pet adoption. Its standout feature is a sophisticated recommendation engine that leverages content-based filtering algorithms. This engine connects users and pets, providing personalized recommendations for the best matches.

## Architecture

The project adopts a microservices architecture with event-driven patterns. Four services - `auth`, `pets`, `applications`, and `recommendations` - communicate via NATS messaging. These services share common logic through the `common` module, an npm package containing abstract shared functionalities. The services, built using TypeScript, Node.js, Express, Redis, and MongoDB, can evolve independently and use TDD principles.

## Back-end development

### Auth Service

- Responsible for user authentication and authorization. TODO

### Pets Service

- Manages pet-related operations, including listing and details. TODO

### Applications Service

- Handles pet adoption applications and approvals. TODO

### Recommendations Service

- Employs content-based filtering to generate personalized pet recommendations.

### Common Module Logic

- Abstract shared logic for common functionalities among services.

## Front-end development

The client, available in the `client` branch, utilizes React, Axios, React Router, Material UI, and Redux for state management. The UI/UX design incorporates custom elements to enhance user experience.

## Recommendation Engine

The heart of Give A Paw's intelligence lies in the recommendation engine. By analyzing user preferences and pet characteristics, it provides personalized suggestions for potential matches.

## Infrastructure

The microservices communicate via NATS, ensuring efficient event-driven communication. Redis and MongoDB store data, contributing to a scalable and resilient infrastructure.

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Kubernetes
- Docker
- Skaffold

## Running the Application

1. Clone the repository.
2. Navigate to the project root.
   TODO

## Tests

The project initially followed a Test-Driven Development (TDD) approach. However, recent changes lack unit tests, causing some failures. Contributions to address this are welcome.

## Deployment

Follow deployment guidelines in the respective service directories. Ensure proper environment configurations for production.

## Thank you!

Thank you for your interest in making Give A Paw a successful pet adoption platform! Although it will propbably not be used from real users, mostly for learning and exeprimenting 🐾
