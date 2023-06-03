import {Table, Model, Column, DataType, BelongsTo} from "sequelize-typescript";
import { Proyecto } from "./proyectos";

@Table({
    timestamps: false,
    tableName: "status"
})
export class Status extends Model{
    @Column({
        type: DataType.TINYINT,
        primaryKey: true,
        allowNull:false
    })
    Estado!:boolean

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Proyecto_id!:number
    @BelongsTo(()=>Proyecto,"Proyecto_id")
    proyecto!:Proyecto

}