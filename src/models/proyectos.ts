import { Table, Column, Model, DataType, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { Carrera } from "./carrera";
import { Maestros } from "./maestros";
import { Tarea } from "./tareas";
import { documentos } from "./documento";
import { Status } from "./status";
import { statusProyecto } from "./statusProyecto";
import { encargadosProyectos } from "./encargadosProyectos";
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
    @BelongsToMany(() => Maestros, () => encargadosProyectos)
    encargados!: Maestros[];
    @HasMany(()=>Tarea,"Proyecto_id")
    tareas!:Tarea[]
    @HasMany(()=>documentos,"Proyecto_id")
    documentos!:documentos[]

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    carrera_clave!:string
    @BelongsTo(()=>Proyecto,"carrera_clave")
    Carrera!:Carrera

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    objetivos!:string

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
        allowNull:false
    })
    alumnos!:string
    @HasMany(()=>Alumnos,"proyecto_id")
    Alumnos!:Alumnos[]
}