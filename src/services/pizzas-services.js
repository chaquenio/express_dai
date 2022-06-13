import config from '../../dbconfig.js';
import sql, { MAX, rows } from 'mssql';
import logger from '../modules/log-helper.js';

const catch_error=new logger();

class PizzaService{
    getAll=async()=>{
     let returnEntity=null;
        try{
            let pool=await sql.connect(config);
            let result=await pool.request().query('SELECT * FROM Pizzas'); 
            returnEntity=result.recordsets;

        }catch(error){
            catch_error.logger(error.toString());
        }
        return returnEntity;
    }
    getById=async(id)=>{
        let returnEntity=null;
        console.log('Estoy en:PizzasService.GetById(id)');
        try {
            let pool=await sql.connect(config);
            let result=await pool.request()
                             .input('pId',sql.Int,id)
                             .query('SELECT * FROM Pizzas WHERE id=@pId');
            returnEntity=result.recordsets[0][0]; 
        }catch(error){
            console.log(error);
            catch_error.logger(error.toString());
        }
        returnEntity;
    }
    insert=async(Pizza)=>{
        let returnEntity=null;
        try{
            let pool=await sql.connect(config);
            let result=await pool.request()
            .input('pNombre',sql.VarChar(150),Pizza.nombre)
            .input('pLibreGluten',sql.Bit,Pizza.libreGluten)
            .input('pImporte',sql.Float,Pizza.importe)
            .input('pDescripcion',sql.VarChar(sql.MAX),Pizza.descripcion)
            .query(`
                INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion)
                VALUES('@pNombre','@pLibreGluten','@pImporte','pDescripcion');
            `);
        returnEntity=result.rowsAffected;
        }catch(error){
            console.log(error);
            catch_error.logger(error.toString());
        }
        return returnEntity;
    }
    update=async(Pizza)=>{
        let returnEntity=null;
        try{
            let pool=await sql.connect(config);
            let result=await pool.request()
            .input('pNombre',sql.VarChar(150),Pizza.nombre)
            .input('pLibreGluten',sql.Bit,Pizza.libreGluten)
            .input('pImporte',sql.Float,Pizza.importe)
            .input('pDescripcion',sql.VarChar(sql.MAX),Pizza.descripcion)
            .query(`
                UPDATE Pizzas
                SET Nombre = @pNombre, LibreGluten = @pLibreGluten,
                Importe=@pImporte, Descripcion=@pDescripcion
            `);
            returnEntity=result.rowsAffected;
        }catch(error){
            console.log(error);
            catch_error.logger(error.toString());
        }
        return returnEntity;
    }
    deleteById=async(id)=>{
        let rowsAffected=0;
        console.log('Estoy en PizzaService.deleteById(id)');
        try{
            let pool=await sql.connect(config);
            let result=await pool.request()
                                .input('pId',sql.Int,id)
                                .query('DELETE From Pizzas WHERE ID=@pId');
            rowsAffected=result.rowsAffected;
        } catch(error){
            console.log(error);
            catch_error.logger(error.toString());
        }
        return rowsAffected;
    }
   
}

export default PizzaService;