BACK-END: 
//First: 
 -add-migration IntialDatabase
 -update-database 
To intial the database
//Second:
 run the api project on 'http' host 'http://localhost:5093'


FRONT-END:
//First:
 --npm install
To install the node-modeules on the react project 

--Summary: I create a database to store student details and three endpoints:
1-getAllStudents to get all students
2-GetStudentByNameEmail to filter them in case I searched with Name or Email 
3-AddNewStudent to create a new student in database 
I made a validation in backend to avoid any mis values to inserted in database and Used autoMapper to convert between the Model and ViewModel
that helped me to made a layer between the entity in DB and the dto that comes from the user. 

Thanks advance

