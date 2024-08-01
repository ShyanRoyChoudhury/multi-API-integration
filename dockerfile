FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

COPY src ./src

RUN yarn && yarn add typescript -g

ARG REPLICATE_API_TOKEN \
    ZEROGPT_API_KEY \
    ANTHROPIC_API_KEY \
    HUGGINGFACE_API_KEY \
    STABLEDIFFUSION_API_KEY

RUN yarn build

CMD [ "yarn", "start" ] 