import {
  Column,
  PrimaryColumn,
  Entity,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "projects" })
export class Project extends BaseEntity {
  @BeforeInsert()
  addID() {
    this.id = v4();
  }

  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "uuid",
    nullable: true,
  })
  clientID: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ enumName: "status", default: "Not Started" })
  status: string;
}
