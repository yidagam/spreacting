-- DROP TABLE article;
-- DROP TABLE MEMBER;
-- COMMIT;

-- CREATE TABLE member (
--     id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
--     name VARCHAR2(128) NOT NULL,
--     email VARCHAR2(256) NOT NULL UNIQUE,
--     age INTEGER
-- );

-- CREATE TABLE article (
--     id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
--     title VARCHAR2(128),
--     description VARCHAR2(4000), 
--     created DATE,
--     updated DATE,
--     member_id INTEGER,
--     FOREIGN KEY(member_id) REFERENCES member(id) ON DELETE CASCADE
-- );