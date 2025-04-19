FROM node:20.11.0

WORKDIR /usr/src/app/genai-saas
COPY ./genai-saas/package*.json .
RUN ["npm", "install"]
