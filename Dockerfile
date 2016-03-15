FROM ruby:2.3.0

RUN apt-get update && \
    apt-get install qt4-default -y && \
    apt-get install nodejs -y && \
    apt-get install python-setuptools -y && \
    easy_install supervisor

COPY conf/supervisord.conf /usr/local/etc/supervisord.conf

# Prepare
RUN mkdir src/
WORKDIR src/

# Level 1
ADD level-1 level-1

# Start
ADD entrypoint.sh .
CMD ["bash", "entrypoint.sh"]
