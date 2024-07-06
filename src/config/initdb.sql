CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS duties (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(255) NOT NULL
    );

INSERT INTO
    duties (name)
VALUES
    ('Complete the project documentation'),
    ('Prepare for the meeting'),
    ('Write the test cases for the new feature'),
    ('Refactor the codebase for better performance'),
    ('Fix the bugs reported in the last sprint'),
    ('Review the pull requests'),
    ('Update the project roadmap');

SELECT
    *
FROM
    duties;