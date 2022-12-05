# HACKATHON MONGODB ATLAS PROJECT

## What I built

This application allows you to see the trends of Google indicating the country.

### Category Submission:

- Real Time

### Screenshots
Diagram
![diagram](/doc_files/diagram.png)
Frontend
![demo frontend](/doc_files/frontend.gif)
Server
![demo server](/doc_files/server.gif)

### Description
This application allows you to see the trends of Google indicating the country.

### Permissive License
MIT License

## Background

I wanted to learn something new and make a simple app.
I saw the FARM stack and the Real Time category. I learned how to integrate MongoDB Atlas and FastAPI. the integration was fast and easy!
So I said why not an application with a button? Then it occurred to me to consume some RSS Feed and Google Trends was my goal.

### How I built it

FastAPI works together with Celery and uses RabbitMQ as a message broker.
FastAPI is in charge of receiving the client's requests and sending them to the processing queue. The result of each task creates items in MongoDB Atlas and the changes are reflected in the interface using Change Streams.

### Additional Resources/Info
https://www.mongodb.com/developer/products/mongodb/real-time-data-javascript/
https://www.mongodb.com/developer/languages/python/farm-stack-fastapi-react-mongodb
https://github.com/mongodb-developer/FARM-Intro/tree/main/backend
https://motor.readthedocs.io/en/stable/tutorial-asyncio.html#tutorial-prerequisites
https://fastapi.tiangolo.com/tutorial/first-steps/
https://pymongo.readthedocs.io/en/stable/tutorial.html
https://fastapi.tiangolo.com/tutorial/cors/


### SERVER

- Fastapi
- RabbitMQ
- Celery

### FRONTEND

- ReactJs or NextJs

### DB

- MongoDB Atlas

### celery command

`celery -A main.celery worker --loglevel=info`