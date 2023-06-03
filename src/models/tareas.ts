import { Table, Model, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: false,
    tableName: "tareas"
})

export class Tarea extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        primaryKey: true
    })
    id!:number
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Proyecto_id!:number
    @BelongsTo(()=>Proyecto,"Proyecto_id")
    proyecto!:Proyecto
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    nombre!:string
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    descripcion!:string
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    comentarios!:string
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    fecha_limite!:string
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    hora_limite!:string
}