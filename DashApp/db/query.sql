CREATE TABLE dataMathNational (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


CREATE TABLE dataMathPublic (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


CREATE TABLE dataMathprivate (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


CREATE TABLE dataReadNational (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


CREATE TABLE dataReadPrivate (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


CREATE TABLE dataReadPublic (
	id SERIAL PRIMARY KEY,
	status VARCHAR,
	result__focalYear VARCHAR,
	result__focalSample VARCHAR,
	result__targetYear VARCHAR,
	result__targetSample VARCHAR,
	result__statType VARCHAR,
	result__subject VARCHAR,
	result__grade INT, 
	result__jurisdiction VARCHAR,
	result__scale VARCHAR,
	result__variable VARCHAR,
	result__variableLabel VARCHAR,
	result__valLabel VARCHAR,
	result__valValue INT,
	result__focalValue DEC,
	result__isFocalStatDisplayable INT,
	result__focalErrorFlag INT,
	result__targetValue DEC,
	result__isTargetStatDisplayable INT,
	result__targetErrorFlag INT,
	result__isSigDisplayable INT,
	result__gap DEC,
	result__sig VARCHAR
);


ALTER TABLE datamathnational 
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datamathnational 
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datamathnational 
RENAME COLUMN result__subject TO subject;
ALTER TABLE datamathnational 
RENAME COLUMN result__grade TO grade;
ALTER TABLE datamathnational 
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datamathnational 
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datamathnational 
RENAME COLUMN result__focalvalue TO avg_2009_math;
ALTER TABLE datamathnational 
RENAME COLUMN result__targetvalue TO avg_2017_math;
ALTER TABLE datamathnational 
RENAME COLUMN result__gap TO avg_math_perchg;

ALTER TABLE datamathnational
DROP COLUMN status;
ALTER TABLE datamathnational
DROP COLUMN result__focalSample;
ALTER TABLE datamathnational
DROP COLUMN result__targetSample;
ALTER TABLE datamathnational
DROP COLUMN result__stattype;
ALTER TABLE datamathnational
DROP COLUMN result__scale;
ALTER TABLE datamathnational
DROP COLUMN result__variable;
ALTER TABLE datamathnational
DROP COLUMN result__variableLabel;
ALTER TABLE datamathnational
DROP COLUMN result__valvalue;
ALTER TABLE datamathnational
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datamathnational
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datamathnational
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datamathnational
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datamathnational
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datamathnational
DROP COLUMN result__sig;





ALTER TABLE datamathprivate
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datamathprivate
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datamathprivate 
RENAME COLUMN result__subject TO subject;
ALTER TABLE datamathprivate
RENAME COLUMN result__grade TO grade;
ALTER TABLE datamathprivate
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datamathprivate
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datamathprivate
RENAME COLUMN result__focalvalue TO avg_2009_math;
ALTER TABLE datamathprivate
RENAME COLUMN result__targetvalue TO avg_2017_math;
ALTER TABLE datamathprivate 
RENAME COLUMN result__gap TO avg_math_perchg;


ALTER TABLE datamathprivate
DROP COLUMN status;
ALTER TABLE datamathprivate
DROP COLUMN result__focalSample;
ALTER TABLE datamathprivate
DROP COLUMN result__targetSample;
ALTER TABLE datamathprivate
DROP COLUMN result__stattype;
ALTER TABLE datamathprivate
DROP COLUMN result__scale;
ALTER TABLE datamathprivate
DROP COLUMN result__variable;
ALTER TABLE datamathprivate
DROP COLUMN result__variableLabel;
ALTER TABLE datamathprivate
DROP COLUMN result__valvalue;
ALTER TABLE datamathprivate
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datamathprivate
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datamathprivate
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datamathprivate
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datamathprivate
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datamathprivate
DROP COLUMN result__sig;





ALTER TABLE datamathpublic
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datamathpublic
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datamathpublic
RENAME COLUMN result__subject TO subject;
ALTER TABLE datamathpublic
RENAME COLUMN result__grade TO grade;
ALTER TABLE datamathpublic
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datamathpublic
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datamathpublic
RENAME COLUMN result__focalvalue TO avg_2009_math;
ALTER TABLE datamathpublic
RENAME COLUMN result__targetvalue TO avg_2017_math;
ALTER TABLE datamathpublic 
RENAME COLUMN result__gap TO avg_math_perchg;


ALTER TABLE datamathpublic
DROP COLUMN status;
ALTER TABLE datamathpublic
DROP COLUMN result__focalSample;
ALTER TABLE datamathpublic
DROP COLUMN result__targetSample;
ALTER TABLE datamathpublic
DROP COLUMN result__stattype;
ALTER TABLE datamathpublic
DROP COLUMN result__scale;
ALTER TABLE datamathpublic
DROP COLUMN result__variable;
ALTER TABLE datamathpublic
DROP COLUMN result__variableLabel;
ALTER TABLE datamathpublic
DROP COLUMN result__valvalue;
ALTER TABLE datamathpublic
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datamathpublic
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datamathpublic
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datamathpublic
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datamathpublic
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datamathpublic
DROP COLUMN result__sig;










ALTER TABLE datareadnational
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datareadnational
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datareadnational
RENAME COLUMN result__subject TO subject;
ALTER TABLE datareadnational
RENAME COLUMN result__grade TO grade;
ALTER TABLE datareadnational
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datareadnational
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datareadnational
RENAME COLUMN result__focalvalue TO avg_2009_read;
ALTER TABLE datareadnational
RENAME COLUMN result__targetvalue TO avg_2017_read;
ALTER TABLE datareadnational 
RENAME COLUMN result__gap TO avg_read_perchg;


ALTER TABLE datareadnational
DROP COLUMN status;
ALTER TABLE datareadnational
DROP COLUMN result__focalSample;
ALTER TABLE datareadnational
DROP COLUMN result__targetSample;
ALTER TABLE datareadnational
DROP COLUMN result__stattype;
ALTER TABLE datareadnational
DROP COLUMN result__scale;
ALTER TABLE datareadnational
DROP COLUMN result__variable;
ALTER TABLE datareadnational
DROP COLUMN result__variableLabel;
ALTER TABLE datareadnational
DROP COLUMN result__valvalue;
ALTER TABLE datareadnational
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datareadnational
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datareadnational
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datareadnational
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datareadnational
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datareadnational
DROP COLUMN result__sig;









ALTER TABLE datareadpublic
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datareadpublic
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datareadpublic
RENAME COLUMN result__subject TO subject;
ALTER TABLE datareadpublic
RENAME COLUMN result__grade TO grade;
ALTER TABLE datareadpublic
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datareadpublic
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datareadpublic
RENAME COLUMN result__focalvalue TO avg_2009_read;
ALTER TABLE datareadpublic
RENAME COLUMN result__targetvalue TO avg_2017_read;
ALTER TABLE datareadpublic 
RENAME COLUMN result__gap TO avg_read_perchg;


ALTER TABLE datareadpublic
DROP COLUMN status;
ALTER TABLE datareadpublic
DROP COLUMN result__focalSample;
ALTER TABLE datareadpublic
DROP COLUMN result__targetSample;
ALTER TABLE datareadpublic
DROP COLUMN result__stattype;
ALTER TABLE datareadpublic
DROP COLUMN result__scale;
ALTER TABLE datareadpublic
DROP COLUMN result__variable;
ALTER TABLE datareadpublic
DROP COLUMN result__variableLabel;
ALTER TABLE datareadpublic
DROP COLUMN result__valvalue;
ALTER TABLE datareadpublic
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datareadpublic
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datareadpublic
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datareadpublic
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datareadpublic
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datareadpublic
DROP COLUMN result__sig;










ALTER TABLE datareadprivate
RENAME COLUMN result__focalyear TO start_year;
ALTER TABLE datareadprivate
RENAME COLUMN result__targetyear TO end_year;
ALTER TABLE datareadprivate
RENAME COLUMN result__subject TO subject;
ALTER TABLE datareadprivate
RENAME COLUMN result__grade TO grade;
ALTER TABLE datareadprivate
RENAME COLUMN result__jurisdiction TO state;
ALTER TABLE datareadprivate
RENAME COLUMN result__valLabel TO gender;
ALTER TABLE datareadprivate
RENAME COLUMN result__focalvalue TO avg_2009_read;
ALTER TABLE datareadprivate
RENAME COLUMN result__targetvalue TO avg_2017_read;
ALTER TABLE datareadprivate 
RENAME COLUMN result__gap TO avg_read_perchg;


ALTER TABLE datareadprivate
DROP COLUMN status;
ALTER TABLE datareadprivate
DROP COLUMN result__focalSample;
ALTER TABLE datareadprivate
DROP COLUMN result__targetSample;
ALTER TABLE datareadprivate
DROP COLUMN result__stattype;
ALTER TABLE datareadprivate
DROP COLUMN result__scale;
ALTER TABLE datareadprivate
DROP COLUMN result__variable;
ALTER TABLE datareadprivate
DROP COLUMN result__variableLabel;
ALTER TABLE datareadprivate
DROP COLUMN result__valvalue;
ALTER TABLE datareadprivate
DROP COLUMN result__isFocalStatDisplayable;
ALTER TABLE datareadprivate
DROP COLUMN result__focalErrorFlag;
ALTER TABLE datareadprivate
DROP COLUMN result__isTargetStatDisplayable;
ALTER TABLE datareadprivate
DROP COLUMN result__targetErrorFlag;
ALTER TABLE datareadprivate
DROP COLUMN result__isSigDisplayable;
ALTER TABLE datareadprivate
DROP COLUMN result__sig;



SELECT * FROM datamathnational
limit 10


SELECT m.start_year, m.end_year, m.subject, m.grade, m.state, m.gender, m.avg_2009_math, m.avg_2017_math, m.avg_math_perchg, r.avg_2009_read, r.avg_2017_read, r.avg_read_perchg
FROM datamathnational AS m
LEFT JOIN datareadnational AS r ON
m.id=r.id;



SELECT m.start_year, m.end_year, m.subject, m.grade, m.state, m.gender, m.avg_2009_math, m.avg_2017_math, m.avg_math_perchg, r.avg_2009_read, r.avg_2017_read, r.avg_read_perchg
FROM datamathprivate AS m
LEFT JOIN datareadprivate AS r ON
m.id=r.id;




SELECT m.start_year, m.end_year, m.subject, m.grade, m.state, m.gender, m.avg_2009_math, m.avg_2017_math, m.avg_math_perchg, r.avg_2009_read, r.avg_2017_read, r.avg_read_perchg
FROM datamathpublic AS m
LEFT JOIN datareadpublic AS r ON
m.id=r.id;