# Запуск
1) Задать настройки сервака в *config.json*
2) `yarn init-bd` - сгенерирует бд
3) `yarn start`

# API
- `GET /book/:id` - получить книгу по ее id
- `GET /books/` - получить все книги, доступны параметры: 
    - offset - оффсет, по-умолчанию 0
    - limit - количество записей, по-умолчанию 1000
    - orderBy - сортировка по заданному полю, возможные значения:
        - id
        - title
        - date
        - author
        - description
        - image
        Пример: `?orderBy=title`
    - groupBy - группировка по заданным полям. Пример: `?groupBy=title,author`
- `POST /book/` - добавить новую книгу, формат книги: 
    ```
    {
        "title": "some title",
        "author": "some author"
        "date": "some date in ISO 8601 | RFC 2822 formats",
        "description": "some description",
        "image": "some image"
    }
    ```
- `PUT /book/:id` - обновление книги с заданным id