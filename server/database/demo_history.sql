/*
Demo exercise history
*/

INSERT INTO exercise_history
(
    user_id,
    question,
    correct_answer,
    user_answer,
    exercise_type,
    difficulty,
    is_correct,
    error_type
)

SELECT
    users.id,
    history.question,
    history.correct_answer,
    history.user_answer,
    history.exercise_type,
    history.difficulty,
    history.is_correct,
    history.error_type

FROM users

JOIN
(
    SELECT
        'd/dx (2x² + 5x)' AS question,
        '4x + 5' AS correct_answer,
        '4x + 5' AS user_answer,
        'polynomial' AS exercise_type,
        'easy' AS difficulty,
        TRUE AS is_correct,
        NULL AS error_type

    UNION ALL

    SELECT
        'd/dx (3x³)',
        '9x²',
        '6x²',
        'power',
        'easy',
        FALSE,
        'POWER_RULE'

    UNION ALL

    SELECT
        'd/dx (sin(x))',
        'cos(x)',
        '-sin(x)',
        'trigonometric',
        'medium',
        FALSE,
        'TRIGONOMETRIC_RULE'

    UNION ALL

    SELECT
        'd/dx (5x⁴)',
        '20x³',
        '20x³',
        'power',
        'hard',
        TRUE,
        NULL
) history

ON users.email IN
(
    'ana.johnson@derivalab.com',
    'carlos.rivera@derivalab.com',
    'emma.wilson@derivalab.com',
    'luis.martinez@derivalab.com'
);