import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';
import { report } from 'process';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted the user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Inserted the user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Inserted the user with id', this.id);
  }
}
