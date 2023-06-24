import { Table, Column, Model, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: true,
    tableName: "alumnos",
    paranoid:true
})
export class Alumnos extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
    })
    codigo!:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    nombre!:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    email!:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password!:string
    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    telefono!:string

    @Column({       
        type:DataType.INTEGER,
        allowNull:true
    })
    proyecto_id!:number
    @BelongsTo(()=>Proyecto,"proyecto_id")
    Proyecto!:Proyecto
}