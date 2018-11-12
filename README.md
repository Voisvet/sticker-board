# TG Bot Control Panel
## Что это?
TG Bot CP - это панель управления Telegram-ботом, выполняющим отправку сообщений, стикеров и файлов в прикреплённые чаты с заданными интервалами или по заданному расписанию.

## Server API
Данное веб-приложение обменивается информацией с сервером с использованием REST API.
Предварительный список доступных запросов:

1. `/login` (GET) - вход в систему
2. `/logout` (GET) - выход из системы (инвалидация токена)
3. `/admins/list` (GET) - получение списка администраторов
4. `/admins/info/{id}` (GET) - получение подробной информации об администраторе
5. `/admins/info/{id}` (PUT) - обновление информации об администраторе в базе
6. `/admins/create` (POST) - добавление нового аккаунта администратора
7. `/messages/list` (GET) - получение списка сообщений из базы
8. `/messages/info/{id}` (GET) - получение детальной информации о сообщении
9. `/messages/create` (POST) - добавление сообщения в базу
10. `/messages/chats_list` (GET) - получение списка доступных чатов
11. `/messages/payload/{id}` (GET) - получение контента конкретного сообщения
12. `/messages/payload/{id}` (PUT) - обновление контента конкретного сообщения
13. `/messages/stickers/recent` (GET) - получение списка с последними использованными в боте стикерами
14. `/messages/stickers/preview/{id}` (GET) - получение превьюшки стикера по id
15. `/messages/info/{id}` (PUT) - обновление информации о сообщении в базе
16. `/rekognition/list` (GET) - получение списка изображений, отправленных на распознавание

Подробности и примеры в [этом документе](https://docs.google.com/document/d/1WR8kNQN62EA4wDUGY_A5wCwILf39jS7b3w128eYO_W4/edit?usp=sharing).

## Что надо сделать
*Список будет обновляться и дополняться по мере необходимости*
1. Управление администраторами
- [x] Просмотр списка администраторов
- [x] Добавление администратора
- [x] Редактирование прав администратора
- [x] Удаление администратора
- [x] Обновление списка администраторов
2. Управление сообщениями
- [x] Просмотр списка всех сообщений
- [x] Просмотр детальной информации о сообщении
- [x] Удаление сообщения
- [x] Обновление списка сообщений
- [ ] Фильтрация по некоторым параметрам (будущие или прошлые сообщения, выбранный чат, др.)
- [ ] Добавление запланированного/периодичного сообщения
3. AWS Image Rekognition
- [x] Просмотр распознанных изображений
- [x] Обновление списка изображений
4. Другое
- [x] Авторизация
- [x] Выход из приложения
