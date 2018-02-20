FROM cypress/base:8

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable

WORKDIR /app

COPY package*.json cypress.json /app/
COPY cypress /app/cypress

RUN npm install

COPY . .
