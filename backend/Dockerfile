# Use lightweight JDK image
FROM eclipse-temurin:21-jdk-alpine

# Create directory for app inside container
WORKDIR /app

# Copy built JAR file into the container
COPY target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
