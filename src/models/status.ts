import {Table, Model, Column, DataType, BelongsToMany} from "sequelize-typescript";
import { Proyecto } from "./proyectos";
import { statusProyecto } from "./statusProyecto";

@Table({
    timestamps: false,
    tableName: "status"
})
export class Status extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
        
    })
    id!:number
    @BelongsToMany(() => Proyecto, () => statusProyecto)
    proyectos!: Proyecto[];
    
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    Estado!:string
}