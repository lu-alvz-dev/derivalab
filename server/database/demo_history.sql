/*
Demo exercise history
Creates 48 practice attempts for the demo student.
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
    error_type,
    created_at
)

SELECT

u.id,

CASE (g.i % 8)

WHEN 0 THEN 'd/dx (2x² + 5x)'
WHEN 1 THEN 'd/dx (3x³)'
WHEN 2 THEN 'd/dx (sin(x))'
WHEN 3 THEN 'd/dx (5x⁴)'
WHEN 4 THEN 'd/dx (x² + 3x)'
WHEN 5 THEN 'd/dx (x⁵)'
WHEN 6 THEN 'd/dx (cos(x))'
ELSE 'd/dx (8x)'

END,

CASE (g.i % 8)

WHEN 0 THEN '4x + 5'
WHEN 1 THEN '9x²'
WHEN 2 THEN 'cos(x)'
WHEN 3 THEN '20x³'
WHEN 4 THEN '2x + 3'
WHEN 5 THEN '5x⁴'
WHEN 6 THEN '-sin(x)'
ELSE '8'

END,

CASE (g.i % 8)

WHEN 0 THEN '4x + 5'
WHEN 1 THEN '6x²'
WHEN 2 THEN '-sin(x)'
WHEN 3 THEN '20x³'
WHEN 4 THEN '2x'
WHEN 5 THEN '5x⁴'
WHEN 6 THEN 'sin(x)'
ELSE '8'

END,

CASE (g.i % 3)

WHEN 0 THEN 'polynomial'
WHEN 1 THEN 'power'
ELSE 'trigonometric'

END,

CASE (g.i % 3)

WHEN 0 THEN 'easy'
WHEN 1 THEN 'medium'
ELSE 'hard'

END,

CASE

WHEN g.i % 4 = 0
OR g.i % 4 = 3

THEN TRUE

ELSE FALSE

END,

CASE

WHEN g.i % 4 = 0
OR g.i % 4 = 3

THEN NULL

WHEN g.i % 4 = 1

THEN 'POWER_RULE'

WHEN g.i % 4 = 2

THEN 'TRIGONOMETRIC_RULE'

END,

CURRENT_TIMESTAMP
-
((48 - g.i) * INTERVAL '1 day')

FROM users u

CROSS JOIN generate_series(1,48) AS g(i)

WHERE u.email='demo.student@derivalab.com';