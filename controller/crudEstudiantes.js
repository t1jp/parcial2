import {conectar} from "../model/db_conectar.js";

var crud_estudiantes=({});

crud_estudiantes.leer=(req,res)=>{
    conectar.query('SELECT id_estudiante,carne,nombres,apellidos,direccion,telefono,genero,email,date_format(fecha_nacimiento,"%Y-%m-%d") as fecha_nacimiento FROM estudiantes;',(err,result1)=>{
        if(err){
            throw err;
        }else{
                    res.render('estudiantes/index',{
                        students:result1
                        
                    });
               
        }
    });

    
}

crud_estudiantes.crud=(req,res)=>{
    const btn_agregar = req.body.btn_agregar;
    const btn_modificar = req.body.btn_modificar;
    const btn_eliminar = req.body.btn_eliminar;
    const id_estudiante = req.body.txt_id;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_email;
    const fecha_nacimiento = req.body.txt_fecha_nacimiento;
    var genero = req.body.genero;
    if(genero==1){
        genero=true;
    }else{
        genero=false;
    }

    
    if(btn_agregar){
        conectar.query('insert into estudiantes set ?',{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:correo_electronico,fecha_nacimiento:fecha_nacimiento,genero:genero},(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }
    if(btn_modificar){
        conectar.query('update estudiantes set ? where id_estudiante=?',[{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:correo_electronico,fecha_nacimiento:fecha_nacimiento,genero:genero},id_estudiante],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }
    if(btn_eliminar){
        conectar.query('delete from estudiantes where id_estudiante=?',[id_estudiante],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }

};
export {crud_estudiantes}