import {Table, Model, Column, DataType, BelongsTo} from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: false,
    tableName: "Status"
})
export class Status extends Model{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull:false
    })
    Estado!:string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Proyecto_id!:number
    @BelongsTo(()=>Proyecto,"Proyecto_id")
    proyecto!:Proyecto

}