
ARG BROWSER_IMAGE=selenium/standalone-chrome:130.0
FROM ${BROWSER_IMAGE}


USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl gnupg ca-certificates xz-utils \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG WDIO_CONF=config/wdio.chrome.conf.js
ENV WDIO_CONF=${WDIO_CONF}

ENV HEADLESS=true

RUN chmod +x docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]
