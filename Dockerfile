FROM ruby:2.3.0

RUN apt-get update && \
    apt-get install qt4-default -y && \
    apt-get install nodejs -y && \
    apt-get install python-setuptools -y && \
    easy_install supervisor

# TODO: merge this to reduce layer
RUN apt-get install npm -y
ADD package.json package.json
RUN npm install

COPY conf/supervisord.conf /usr/local/etc/supervisord.conf

# Prepare
RUN mkdir src/ && mkdir /secret
WORKDIR src/

ADD secret /secret
ADD levels levels

VOLUME ["/src/levels", "/secret"]

# Start
ADD entrypoint.sh .
CMD ["bash", "entrypoint.sh"]
