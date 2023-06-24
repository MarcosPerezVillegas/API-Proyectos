import { Table, Column, Model, DataType, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { Proyecto } from "./proyectos";
import { encargadosProyectos } from "./encargadosProyectos";

@Table({
    timestamps: true,
    tableName: "maestros",
    paranoid:true
})
export class Maestros extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
    })
    codigo!:string;
    @BelongsToMany(() => Proyecto, () => encargadosProyectos)
    Proyectos!: Proyecto[]

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
}