# Transporteye services 

На текущий момент проект состоит из четырех компонент:
* Сервис авторизации/аутентификации (authentication service)
* Сервис с бизнес логикой (transport service)
* База данных (Postgres)
* API тестер (Frontend service)

## Интсрукции

Внимательно прочитайте все что описано ниже, это поможет избежать лишних вопросов.

### Требования

Что вам нужно установить:

Очень желательно иметь Линукс.

Минимум:
* [Docker](https://www.docker.com/) - Запускает каждый сервис в унифицированном контейнере 
* [Docker-compose](https://docs.docker.com/compose/install/) - Чтобы запускать все сервисы сразу
* [Java8](https://java.com/ru/download/)
* [Maven](https://maven.apache.org/) - Собирает проект и подтягивает зависимости

Дополнительно:
* [Postman](https://www.getpostman.com/) - Тестить апи
* [DBeaver](https://dbeaver.io/) - Тестить базу


### Запуск

Чтобы запустить сервисы выполните в консоли следующие команды:

Клонируем репо:
```
    git clone https://github.com/checorone/transporteye.git
```

Переходим в деректорию сборки:
```
    cd transporteye
```

Собираем сервисы и упаковываем их в докер контейнеры:
```
    mvn clean package docker:build
```

Запускаем сервисы:

```
    docker-compose -f docker/common/docker-compose.yml up
```

## Описание структуры

```
    WORK IN PROGRESS
```