# Gatling Template HTTP
## Содержание
* [Установка тестируемого приложения](#установка-тестируемого-приложения)
* [Описание мock-server](#описание-мock-server)
  * [Базовые методы](#базовые-методы)
  * [Методы memory leak](#методы-memory-leak)
* [Мониторинг](#мониторинг)  
* [Запуск сценариев нагрузки](#запуск-сценариев-нагрузки)

## Установка тестируемого приложения
Выполнить 1 часть: https://gitlab.com/tinkoffperfworkshop/part-1/cheat-sheet

Для начала работы вам надо поднять тестовый http-сервер.
 
* Клонировать репозиторий
```shell script
git clone https://gitlab.com/tinkoffperfworkshop/part-2/gatling-template-http-sandbox.git
```

* Перейти в директорию с проектом
```shell script
cd gatling-template-http/docker
```

* Поднять контейнеры с окружением
```shell script
docker-compose up -d
```

<details>
<summary>Пример успешного запуска</summary>

```shell script
$ docker-compose up -d
Creating mockServer ... done
```
</details>

* Проверить что все контейнеры поднялись:
```shell script
docker-compose ps
```

<details>
<summary>Пример успешного запуска</summary>

```shell script
$ docker-compose ps -a
   Name                 Command               State           Ports
----------------------------------------------------------------------------
mockServer   /usr/bin/java -jar /usr/sh ...   Up      0.0.0.0:7000->7000/tcp
```

</details>

В результате у вас будет поднят http-mock-server на 7000 порту доступный по адресу http://localhost:7000/.

## Описание мock-server
Данный сервер реализует 5 методов и построен на базе [javalin](https://javalin.io/).

### Базовые методы
* `/` - корневой адрес, отдающий страницу с надписью `Hello, rate-limited World!` и кодом 200. У данного запроса есть ограничение на не более 5 запросов в минуту. При его превышении вам будет отдаваться страница с текстом `Rate limit exceeded - Server allows 5 requests per minute.` и кодом ответа 429;
* `/post` - метод `post` отдающий страницу с надписью `Successful post response` и кодом 200;
* `/get` - метод `get` отдающий страницу с надписью `Successful get response` и кодом 200;

Запросы `post` и `get` имеют входной параметр `session_id`.

### Методы memory leak
В моке, также реализованы самые популярные методы вызывающие различные утечки памяти (_memory leaks_). 
* `/memoryleaks/1` - метод `get` отдающий страницу с надписью `Memory Leak Through static Fields - counter 10` и кодом 200. Параметр `counter` в запросе отвечает за количество добавленных статистических записей в список и должен быть не меньше 10. 
Пример вызова: http://localhost:7000/memoryleaks/1?counter=11

* `/memoryleaks/2` - метод `get` отдающий страницу с надписью `Improper equals() and hashCode() Implementations - counter 10` и кодом 200. Параметр `counter` в запросе отвечает за количество добавленных объектов (дублируемых) в список и должен быть не меньше 10.
 Пример вызова: http://localhost:7000/memoryleaks/2?counter=11

* `/memoryleaks/3` - метод `get` отдающий страницу с надписью `UnclosedStream` и кодом 200. Параметр `url` в запросе отвечает адрес файла, который будет открыт в новом потоке.
Пример вызова: http://localhost:7000/memoryleaks/3?url=http://norvig.com/paip.html

С более подробным описание типов утечек памяти можно посмотреть здесь:
* https://topjava.ru/blog/java-memory-leaks
* https://stackify.com/memory-leaks-java/
* https://www.baeldung.com/java-memory-leaks 

## Мониторинг
По умолчанию при запуске будет открыт JMX-порт по адресу `localhost:9010`. При этом будет подключен jmx-node-exporter для prometeus, все метрики будут доступны по адресу http://localhost:9011/metrics.

## Запуск сценариев нагрузки
Запуск тестов происходит по 3 заранее готовым сценариям:
* `gatling:testOnly *MaxPerformnaceTest` - запуск теста максимальной производительности;
* `gatling:testOnly *Stability` - запуск теста стабильности;
* `gatling:testOnly *DebugTest` - запуск отладочного теста, все запросы его проксируются на порт 8888. 

Параметры запусков тестов определены в файле `simulation.conf`. 
