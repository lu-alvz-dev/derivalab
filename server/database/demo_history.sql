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

u.id,

data.question,

data.correct_answer,

data.user_answer,

data.exercise_type,

data.difficulty,

data.is_correct,

data.error_type

FROM users u

CROSS JOIN
(
    VALUES

    (
        'd/dx (2x² + 5x)',
        '4x + 5',
        '4x + 5',
        'polynomial',
        'easy',
        TRUE,
        NULL
    ),

    (
        'd/dx (3x³)',
        '9x²',
        '6x²',
        'power',
        'easy',
        FALSE,
        'POWER_RULE'
    ),

    (
        'd/dx (sin(x))',
        'cos(x)',
        '-sin(x)',
        'trigonometric',
        'medium',
        FALSE,
        'TRIGONOMETRIC_RULE'
    ),

    (
        'd/dx (5x⁴)',
        '20x³',
        '20x³',
        'power',
        'medium',
        TRUE,
        NULL
    ),

    (
        'd/dx (x²+3x)',
        '2x+3',
        '2x',
        'polynomial',
        'easy',
        FALSE,
        'CONSTANT_RULE'
    ),

    (
        'd/dx (x⁵)',
        '5x⁴',
        '5x⁴',
        'power',
        'hard',
        TRUE,
        NULL
    ),

    (
        'd/dx (cos(x))',
        '-sin(x)',
        'sin(x)',
        'trigonometric',
        'medium',
        FALSE,
        'TRIGONOMETRIC_SIGN'
    ),

    (
        'd/dx (8x)',
        '8',
        '8',
        'polynomial',
        'easy',
        TRUE,
        NULL
    )

) AS data
(
    question,
    correct_answer,
    user_answer,
    exercise_type,
    difficulty,
    is_correct,
    error_type
)

WHERE u.email='demo.student@derivalab.com';