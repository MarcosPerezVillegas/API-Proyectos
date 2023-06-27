import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "administradores",
    paranoid:true
})
export class Administradores extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
    })
    codigo!:string;

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