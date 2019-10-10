-- Create Four Tables
CREATE TABLE male_math; (
  id INT PRIMARY KEY,
  state TEXT,
  gender TEXT,
  avg_2009_mathScores INT,
  avg_2017_mathScores INT,
  mathScores_precentChange INT
);

CREATE TABLE female_math; (
  id INT PRIMARY KEY,
  state TEXT,
  gender TEXT,
  avg_2009_mathScores INT,
  avg_2017_mathScores INT,
  mathScores_precentChange INT
);

CREATE TABLE male_reading; (
  id INT PRIMARY KEY,
  state TEXT,
  gender TEXT,
  avg_2009_readingScores INT,
  avg_2017_readingScores INT,
  readingScores_precentChange INT
);

CREATE TABLE female_reading; (
  id INT PRIMARY KEY,
  state TEXT,
  gender TEXT,
  avg_2009_readingScores INT,
  avg_2017_readingScores INT,
  readingScores_precentChange INT
)
