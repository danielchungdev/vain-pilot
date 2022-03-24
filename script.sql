


DROP TABLE subjects;
CREATE TABLE subjects (
  id: VARCHAR(5) PRIMARY KEY NOT NULL,
  name: VARCHAR(100) NOT NULL
);

INSERT INTO subjects(id, name) VALUES ('A', 'Adventure');
INSERT INTO subjects(id, name) VALUES ('C', 'Criminal');
INSERT INTO subjects(id, name) VALUES ('D', 'Domestic');
INSERT INTO subjects(id, name) VALUES ('G', 'Great Man');
INSERT INTO subjects(id, name) VALUES ('H', 'Historical');
INSERT INTO subjects(id, name) VALUES ('L', 'Literary');
INSERT INTO subjects(id, name) VALUES ('M', 'Military');
INSERT INTO subjects(id, name) VALUES ('P', 'Politics');
INSERT INTO subjects(id, name) VALUES ('R', 'Religious');
INSERT INTO subjects(id, name) VALUES ('S', 'Satire');
INSERT INTO subjects(id, name) VALUES ('T', 'Travel');
INSERT INTO subjects(id, name) VALUES ('CY', 'Celebrity');
INSERT INTO subjects(id, name) VALUES ('MC', 'Middle-class, MC');
INSERT INTO subjects(id, name) VALUES ('SC', 'Social Critique');
INSERT INTO subjects(id, name) VALUES ('SD', 'School Days');
INSERT INTO subjects(id, name) VALUES ('TH', 'Theatre');
INSERT INTO subjects(id, name) VALUES ('U', 'Unknown');
