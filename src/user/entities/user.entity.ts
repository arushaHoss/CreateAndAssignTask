import { Task } from 'src/task/entities/task.entity';
import { Team } from 'src/team/entities/team.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Team)
  teams: Team[];

  @ManyToMany(() => Task)
  tasks: Task[];
  
}