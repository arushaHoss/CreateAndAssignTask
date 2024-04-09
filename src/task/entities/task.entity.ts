import { User } from 'src/user/entities/user.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @ManyToMany(() => User)
  @JoinTable()
  assignees: User[];

  @Column({ default: 'toDo' }) // Default status is 'toDo'
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
