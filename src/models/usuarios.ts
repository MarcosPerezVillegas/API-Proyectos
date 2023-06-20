import { Table, Column, Model, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Rol } from "./roles";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: true,
    tableName: "usuario",
    paranoid:true
})
export class Usuario extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
    })
    codigo!:string;
    @BelongsTo(()=>Proyecto,"codigo")
    proyecto!:Proyecto
    @HasMany(()=>Proyecto,"codigo")
    proyectos!:Proyecto[]

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
        allowNull:false
    })
    rol_id!:number
    @BelongsTo(()=>Rol,"rol_id")
    Rol_Usuario!:Rol
}