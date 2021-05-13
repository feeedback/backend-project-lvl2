### Hexlet tests and linter status:

[![Actions Status](https://github.com/feeedback/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/feeedback/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9152c9151d168318a60a/maintainability)](https://codeclimate.com/github/feeedback/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9152c9151d168318a60a/test_coverage)](https://codeclimate.com/github/feeedback/backend-project-lvl2/test_coverage)
[![wakatime](https://wakatime.com/badge/github/feeedback/backend-project-lvl2.svg)](https://wakatime.com/badge/github/feeedback/backend-project-lvl2)

Реализация учебного проекта Hexlet Node.js №2 https://ru.hexlet.io/programs/backend/projects/46

**Вычислитель отличий** – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

_Пример использования:_

```
# формат plain
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
