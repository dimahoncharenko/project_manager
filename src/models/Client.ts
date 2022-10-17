import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";

import { v4 } from "uuid";

@Entity({ name: "clients" })
export class Client extends BaseEntity {
  @BeforeInsert()
  addID() {
    this.id = v4();
  }

  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 13,
  })
  phone: string;
}
