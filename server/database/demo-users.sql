/*
Demo users 
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
    students.email,
    '$2b$10$KSqDVjmj4aNtyp40aHXHd.0q1sJs1TqqeAbImRUoRZDeAR3fdsyv2',
    'student',
    teacher.id

FROM
(
    SELECT 'ana.johnson@derivalab.com' AS email

    UNION ALL

    SELECT 'carlos.rivera@derivalab.com'

    UNION ALL

    SELECT 'emma.wilson@derivalab.com'

    UNION ALL

    SELECT 'luis.martinez@derivalab.com'
) students

CROSS JOIN
(
    SELECT id
    FROM users
    WHERE email='demo.teacher@derivalab.com'
) teacher

ON CONFLICT (email)
DO NOTHING;