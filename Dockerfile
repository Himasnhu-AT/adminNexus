FROM node:slim

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY turbo.json /usr/src/app
COPY package.json /usr/src/app
COPY pnpm-workspace.yaml /usr/src/app
COPY LICENSE /usr/src/app
COPY .gitignore /usr/src/app/

COPY ./apps /usr/src/app
COPY ./packages /usr/src/app

RUN pnpm install
RUN pnpm build

EXPOSE 3000
EXPOSE 4000

CMD ["pnpm", "prod"]
