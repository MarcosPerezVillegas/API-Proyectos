import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Proyecto } from "./proyectos";
import { Maestros } from "./maestros";

@Table({
  tableName: "encargados_proyectos",
  timestamps: false,
})
export class encargadosProyectos extends Model<encargadosProyectos> {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true
  })
  id!: number;

  @ForeignKey(() => Maestros)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  codigo_encargado!: string;

  @ForeignKey(() => Proyecto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  proyecto_id!: number;
}