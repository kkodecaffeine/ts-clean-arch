import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('runner', { schema: 'runner', database: 'runner' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('char', { name: 'name', comment: '이름', length: 20 })
  name: string;

  @Column('char', { name: 'phone', comment: '전화번호', length: 11 })
  phone: string;

  @Column('varchar', {
    name: 'roadAddress',
    comment: '기본 도로명 주소',
    length: 60,
  })
  address: string;

  @Column('varchar', { name: 'room', comment: '상세주소', length: 60 })
  address2: string;

  @Column('char', { name: 'postcode', comment: '우편번호', length: 5 })
  postcode: string;

  @Column('varchar', {
    name: 'bank_name',
    nullable: true,
    comment: '은행 계좌이름',
    length: 15,
  })
  bankName: string | null;

  @Column('varchar', {
    name: 'bank_acc_number',
    nullable: true,
    comment: '은행 계좌번호',
    length: 20,
  })
  bankAccNumber: string | null;
}
