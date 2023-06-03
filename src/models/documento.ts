import { Table, Model, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: false,
    tableName: "archivos_documentos"
})

export class documentos extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        primaryKey: true
    })
    id!:number
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
    tipo_archivo!:string
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Proyecto_id!:number
    @BelongsTo(()=>Proyecto,"Proyecto_id")
    proyecto!:Proyecto
}