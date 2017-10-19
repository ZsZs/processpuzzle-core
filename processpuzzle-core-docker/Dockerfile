# Pull base image.
FROM store/oracle/serverjre:8

# Define working directory.
WORKDIR /data

# Define default command.
#CMD ["bash"]

MAINTAINER zsolt.zsuffa@gmail.com
EXPOSE 9125
ADD ./build/processpuzzle-core.jar /data/processpuzzle-core.jar
VOLUME /var/log/processpuzzle-core/
CMD java -jar processpuzzle-core.jar -Dspring.profiles.active=local
