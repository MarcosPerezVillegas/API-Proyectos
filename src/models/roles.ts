import {Table, Model, Column, DataType, HasMany} from "sequelize-typescript";
import { Usuario } from "./usuarios";

@Table({
    timestamps: false,
    tableName: "rol"
})
export class Rol extends Model{
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    rol!:string

    @Column({
        type: DataType.INTEGER,
        primaryKey:true,
        allowNull:false
    })
    id!:number
    @HasMany(()=>Usuario,"rol_id")
    usuario!:Usuario[]

}