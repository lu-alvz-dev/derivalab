/*
Reset demo data
tool forDevelopment only
*/

/*
Delete demo exercise history
*/

DELETE FROM exercise_history
WHERE user_id IN
(
    SELECT id
    FROM users
    WHERE email IN
    (
        'demo.teacher@derivalab.com',
        'ana.johnson@derivalab.com',
        'carlos.rivera@derivalab.com',
        'emma.wilson@derivalab.com',
        'luis.martinez@derivalab.com'
    )
);


/*
Delete demo students
*/

DELETE FROM users
WHERE email IN
(
    'ana.johnson@derivalab.com',
    'carlos.rivera@derivalab.com',
    'emma.wilson@derivalab.com',
    'luis.martinez@derivalab.com'
);


/*
Delete demo teacher
*/

DELETE FROM users
WHERE email = 'demo.teacher@derivalab.com';