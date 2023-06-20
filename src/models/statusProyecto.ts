import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Proyecto } from "./proyectos";
import { Status } from "./status";

@Table({
  tableName: "status_proyecto",
  timestamps: false,
})
export class statusProyecto extends Model<statusProyecto> {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true
  })
  id!: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id!: number;

  @ForeignKey(() => Proyecto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  proyecto_id!: number;
}