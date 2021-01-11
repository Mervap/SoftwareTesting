## Software testing
### Идея :heavy_check_mark:
[Игра «Жизнь»](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

Можно настраивать всякие параметры генерации, есть страничка помощи, возможность сохранять 
интересные комбинации, полученные в результате одной из игр.

### Frontend
#### Main:
:heavy_check_mark: Приложение на React\
:heavy_check_mark: 5 страниц роутинга (`/`, `/help`, `/login`, `/register`, `/storage`)\
:x: node.js бекенд\
\
:heavy_check_mark: unit tests\
:heavy_check_mark: component tests\
:x: e2e tests

#### Advanced:
:heavy_check_mark: Приложение содержит авторизацию\
:construction: Тесты для проверки авторизации\
:heavy_check_mark: Несколько наборов тестов

#### Bonus :x:

### E2E
#### Main:
:construction: Cypress tests\
:construction: Playwright tests

#### Advanced:
:construction: Тесты, не проходящие авторизацию

#### Bonus :x:

### Backend
#### Main:
:heavy_check_mark: Сервис Kotlin + Spring + PostgreSQL\
:heavy_check_mark: 3 контроллера (+ 1 неявный)\
:heavy_check_mark: Unit & Component tests\
:heavy_check_mark: TestContainers для тестов с DB\
:heavy_check_mark: Mockito для тестов

#### Advanced:
:construction: Взаимодействие Backend и Frontend\
:heavy_check_mark: Тесты на авторизацию\
:x: Отдельные Spring Test Configruation\
:x: Тестовая документация через Asci Doctor

#### Bonus :x:

### CI/CD
#### Main:
:construction: GitHub Action для запуска тестов на по пушу в master

#### Advanced:
:construction: GitHub Action для деплоя AWS

#### Bonus :x:

### Reporting. BDD
#### Bonus:
:construction: Allure reporting для написанных тестов

### Contract tests :x:

### A11Y
#### Bonus:
:construction: Протестировать сайт на а11y\
:construction: Пофиксить проблемы\
:x: Сделать автоматический тест с axe

### Selenium
#### Main:
:construction: E2E с Selenide

#### Advanced:
:construction: Запуск тестов с Selenoid

#### Bonus :x:

### Performance testing
#### Main:
:heavy_check_mark: Воркшоп пройден

#### Advanced:
:heavy_check_mark: CI с Github Actions

#### Bonus :x:
