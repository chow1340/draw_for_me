### temp container to build using gradle
##FROM gradle:6.6.0 AS TEMP_BUILD_IMAGE
##ENV APP_HOME=/usr/app/
##WORKDIR $APP_HOME
##COPY build.gradle settings.gradle $APP_HOME
##
##COPY gradle $APP_HOME/gradle
##COPY --chown=gradle:gradle . /home/gradle/src
##USER root
##RUN chown -R gradle /home/gradle/src
###
##RUN gradle build
#
#
##Actual build
#FROM openjdk:12-jdk-alpine
#
#VOLUME /tmp
#
#ARG JAR_FILE=build/libs/*
#
#COPY ${JAR_FILE} app.jar
#
#
#EXPOSE 8080
#
#ENTRYPOINT ["java" , "-jar", "app.jar"]


FROM openjdk:8u171-jdk-alpine3.8

#Assign permissions
RUN set -x && \
    addgroup -g 1000 appuser && \
    adduser -u 1000 -D -G appuser appuser
