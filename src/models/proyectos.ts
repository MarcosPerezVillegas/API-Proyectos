import { Table, Column, Model, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Carrera } from "./carrera";
import { Usuario } from "./usuarios";

@Table({
    timestamps: false,
    tableName: "Proyecto",
})
export class Proyecto extends Model{
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        primaryKey:true,
    })
    id!:number;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    nombrep!:string
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
    usuario_codigo!:string
    @BelongsTo(()=>Usuario,"usuario_codigo")
    usuarios!:Usuario

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    carrera_clave!:string
    @BelongsTo(()=>Carrera,"carrera_clave")
    carrera!:Carrera
}