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
  })
  status_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  proyecto_id!: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: number;

  @ForeignKey(() => Proyecto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  proyectoId!: number;
}