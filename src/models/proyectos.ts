import { Table, Column, Model, DataType, BelongsTo, HasMany, BelongsToMany, HasOne } from "sequelize-typescript";
import { Carrera } from "./carrera";
import { Maestros } from "./maestros";
import { Tarea } from "./tareas";
import { Status } from "./status";
import { statusProyecto } from "./statusProyecto";
import { Alumnos } from "./alumnos";

@Table({
    timestamps: false,
    tableName: "proyecto",
})
export class Proyecto extends Model{
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        onDelete:'Cascade'
    })
    id!:number;
    @BelongsToMany(() => Status, () => statusProyecto)
    statuses!: Status[];
    @HasMany(()=>Tarea,"Proyecto_id")
    tareas!:Tarea[]
    @HasMany(()=>Alumnos,"proyecto_id")
    Alumnos!:Alumnos[]

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    carrera_clave!:string
    @BelongsTo(()=>Carrera,"carrera_clave")
    Carrera!:Carrera

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    nombre!:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    objetivos!:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    codigo!:string;
    @BelongsTo(() => Maestros,'codigo')
    encargado!: Maestros

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    fechainicio!:string;

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    fechafinal!:string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    alumnos!:string
}