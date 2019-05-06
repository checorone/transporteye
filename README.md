# Transporteye services 

На текущий момент проект состоит из четырех компонент:
* Сервис авторизации/аутентификации (authentication service)
* Сервис с бизнес логикой (transport service)
* База данных (Postgres)
* API тестер (Frontend service)

## Инструкции

Внимательно прочитайте все что описано ниже, это поможет избежать лишних вопросов.

### Требования

Что вам нужно установить:

Очень желательно иметь Линукс.

Минимум:
* [Java8](https://java.com/ru/download/)
* [Maven](https://maven.apache.org/) - Собирает проект и подтягивает зависимости

Желательно:
* [Docker](https://www.docker.com/) - Запускает каждый сервис в унифицированном контейнере 
* [Docker-compose](https://docs.docker.com/compose/install/) - Чтобы запускать все сервисы сразу

Опционально:
* [Postman](https://www.getpostman.com/) - Тестить апи
* [DBeaver](https://dbeaver.io/) - Тестить базу

### Установка необходимых пакетов в Ubuntu

```
    WORK IN PROGRESS
```

## Сборка и запуск

### Сборка

+ Клонируем репо:
```
    git clone https://github.com/checorone/transporteye.git
```

+ Переходим в деректорию сборки:
```
    cd transporteye
```

+ Собираем сервисы и упаковываем их в докер контейнеры:
```
    mvn clean package docker:build
```
### Запуск вручную

+ Устанавливаем, настраиваем и запускаем PostgreSQL (Зависит от дистрибутива)
    
```
    Заметка: С помощью docker-compose вы можете запускать базу, без каких либо дополнительных настроек и установок. 
    Просто выполните в консоли следующую команду:
    docker-compose -f docker/common/docker-compose.yml up database
```
    
+ Запускаем сервис Аутентификации
```
java -Djava.security.egd=file:/dev/./urandom -Dserver.port=8901         \ 
    -Dspring.datasource.url=jdbc:postgresql://localhost:5432/postgres   \
    -Dspring.profiles.active=default                                    \
    -jar authentication-service/target/authentication-service-0.0.1-SNAPSHOT.jar
```
+ Запускаем сервис Транспорта
```
java -Djava.security.egd=file:/dev/./urandom -Dserver.port=8085 \
    -Dsecurity.oauth2.resource.userInfoUri=http://localhost:8901/user \
    -Dspring.datasource.url=jdbc:postgresql://localhost:5432/postgres \
    -Dspring.profiles.active=default \
    -jar transport-service/target/transport-service-0.0.1-SNAPSHOT.jar
```
+ Открываем и тестируем фронтэнд
```
    frontend-service/src/main/web/indexman.html
```

### Запуск через Docker-compose

Запускаем сервисы:

```
    docker-compose -f docker/common/docker-compose.yml up
```

Останавливаем сервисы:

```
    Ctrl + C
```

Полностью перезапустить сервисы:

```
    docker-compose -f docker/common/docker-compose.yml rm
    docker-compose -f docker/common/docker-compose.yml up
```

## Использование

### Через Апи тестер

[localhost (порт 80)](http://localhost)

### Получить токен на доступ через postman
```
    У http://localhost:8901/oauth/token. 
    При этом выбрать авторизацию Basic Auth c логином netcracker и паролем ncpassword. 
    Метод POST и тип body установить как form-data, поля:
    * grant_type : password
    * username : john.doe
    * password : userpass
```

### Отправить GET к transport service через postman
```
    На http://localhost:8085/api/v1/transport. 
    При этом выбрать авторизацию Bearer и вставить полученный access_token.
```

## Описание структуры

```
    WORK IN PROGRESS
```
