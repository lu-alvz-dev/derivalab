/*
Schema for guest and visitor Demo (Unregistered Access)
*/

INSERT INTO users
(
    email,
    password,
    role
)
VALUES
(
    'demo.teacher@derivalab.com',

    '$2b$10$KSqDVjmj4aNtyp40aHXHd.0q1sJs1TqqeAbImRUoRZDeAR3fdsyv2',

    'teacher'
)

ON CONFLICT (email)
DO NOTHING;

INSERT INTO users
(
    email,
    password,
    role,
    teacher_id
)
SELECT

'demo.student@derivalab.com',

'$2b$10$KSqDVjmj4aNtyp40aHXHd.0q1sJs1TqqeAbImRUoRZDeAR3fdsyv2',

'student',

id

FROM users

WHERE email='demo.teacher@derivalab.com'

ON CONFLICT (email)
DO NOTHING;