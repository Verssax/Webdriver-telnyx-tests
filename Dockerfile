
ARG BROWSER_IMAGE=selenium/standalone-chrome:130.0
FROM ${BROWSER_IMAGE}


USER root


RUN apt-get update \
    && apt-get install -y --no-install-recommends curl gnupg ca-certificates \
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

CMD ["sh", "-c", "npx wdio run $WDIO_CONF"]
