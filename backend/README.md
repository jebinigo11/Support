# Backend - Spring Boot (PostgreSQL + WebSocket)

## Prereqs
- Java 17+
- Maven
- PostgreSQL running locally with DB `telecomdb` and user/pass in `application.properties`

## Run
```bash
mvn spring-boot:run
```

- REST: http://localhost:8080/api/issues
- WS endpoint: ws://localhost:8080/ws (SockJS)
- Topic: /topic/issues
