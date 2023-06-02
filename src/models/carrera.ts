import {Table, Model, Column, DataType, HasMany} from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: false,
    tableName: "carrera"
})
export class Carrera extends Model{
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    nombre!:string

    @Column({
        type: DataType.STRING,
        primaryKey:true,
        allowNull:false
    })
    clave!:string
    @HasMany(()=>Proyecto,"carrera_clave")
    proyecto!:Proyecto[]

}