
const Joi = require ('joi');
const express = require ('express');
const { send } = require('process');
const app = express();
app.use(express.json());
const courses=[
];
const students=[
];
//post course
app.post('/api/courses', (req,res)=>{
    const schema = Joi.object({
        name:Joi.string().required().min(5),
        code:Joi.string().required().alphanum().min(6).max(6),
        description:Joi.string().optional().max(200)
    });
    const resz= schema.validate(req.body);
    console.log(resz);
    if (resz.error){
        res.status(400).send(resz.error.details[0].message)
        return;
    }
const course = {
id: courses.length+1,
name: req.body.name,
code: req.body.code,
description: req.body.description
}
courses.push(course);
res.send(course);}
);
// post student
app.post('/api/students', (req,res)=>{
    const schema = Joi.object({
        name:Joi.string().required().regex(/^[a-zA-Z/']*$/),
        code:Joi.string().required().min(7).max(7)
    });
    const resz= schema.validate(req.body);
    console.log(resz);
    if (resz.error){
        res.status(400).send(resz.error.details[0].message)
        return;
    }
const student = {
id: students.length+1,
name: req.body.name,
code: req.body.code
}
students.push(student);
res.send(student);}
);
//put course
app.put('/api/courses/:id',(req,res)=>{
    //check
    const course= courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Doesnt exist');
    //validate
    const {error} = validatoo(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    //update
    course.name= req.body.name;
    course.code= req.body.code;
    course.description= req.body.description;
    res.send(course)
});
//put stduent
app.put('/api/students/:id',(req,res)=>{
    //check
    const student= students.find(s=>s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Doesnt exist');
    //validate
    const {error} = validatooStudent(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    //update
    student.name= req.body.name;
    student.code= req.body.code;
    res.send(student)
});
//course input validation
function validatoo(course)
{
    const schema = Joi.object({
        name:Joi.string().required().min(5),
        code:Joi.string().required().alphanum().min(6).max(6),
        description:Joi.string().optional().max(200)
    });
    reso=schema.validate(course);
    return reso;
}
//student's input validation
function validatooStudent(student)
{
    const schema = Joi.object({
        name:Joi.string().required().regex(/^[a-zA-Z/']*$/),
        code:Joi.string().required().min(7).max(7)
    });
    reso=schema.validate(student);
    return reso;
}
//get students and courses list
app.get('/api/courses',(req,res)=>{res.send(courses);});
app.get('/api/students',(req,res)=>{res.send(students);});
//get certain course 
app.get('/api/courses/:id',(req,res)=>{
    const course= courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Doesnt exist');
    res.send(course);});
//get certain student 
app.get('/api/students/:id',(req,res)=>{
        const student= students.find(s=>s.id === parseInt(req.params.id));
        if (!student) return res.status(404).send('Doesnt exist');
        res.send(student);});
//deleting certain student
app.delete('/api/students/:id',(req,res)=>{
    //check
    const student= students.find(s=>s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Doesnt exist');
    //delete
    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);
});
//delete course
app.delete('/api/courses/:id',(req,res)=>{
    //check
    const course= courses.find(s=>s.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Doesnt exist');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
app.listen(3000,()=>console.log('Listening'));