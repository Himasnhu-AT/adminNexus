FROM rust:1.80.1-slim-bullseye

WORKDIR /app

LABEL version="0.1.0" \
    description="adminNexus" \
    url="https://adminnexus.vercel.app/" \
    vcs-url="https://github.com/Himasnhu-AT/adminNexus" \
    vcs-ref="Himasnhu-AT" \
    vendor="OpenEdu"

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    git \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

ENV NVM_DIR="/root/.nvm"

RUN . "$NVM_DIR/nvm.sh" && nvm install 20
RUN . "$NVM_DIR/nvm.sh" && node --version
RUN . "$NVM_DIR/nvm.sh" && npm --version

COPY . .

RUN cargo build --release

RUN cd website && . "$NVM_DIR/nvm.sh" && npm i && . "$NVM_DIR/nvm.sh" && npm run build

EXPOSE 8080

CMD ["cargo", "run", "--release", "--", "--port", "8080"]
