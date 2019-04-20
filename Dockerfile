FROM node:10-alpine as base

RUN yarn global add pkg pkg-fetch

ENV NODE node10
ENV PLATFORM alpine
ENV ARCH x64
RUN pkg-fetch ${NODE} ${PLATFORM} ${ARCH}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --production

# Bundle app source
COPY . .

# Build assets
RUN pkg package.json --targets ${NODE}-${PLATFORM}-${ARCH} --output server-start

# --- Release with Alpine ----
FROM node:8-alpine AS release

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY --from=base /usr/src/app/server-start ./

# Exports
USER node
EXPOSE 3000
CMD [ "./server-start" ]