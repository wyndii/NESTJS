import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto.js';
import { UpdateTareaDto } from './dto/update-tarea.dto.js';
import { EstadoTarea, Tarea } from './entities/tarea.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TareasService {

  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>
  ){}

  async create(data: CreateTareaDto) {
    const register = this.tareaRepository.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      estado: data.estado ?? EstadoTarea.pendiente,
    });
    return await this.tareaRepository.save( register );
  }

  async findAll() {
    return await this.tareaRepository.find();
  }

  async findOne(id_tarea: number) {
    const tarea = await this.tareaRepository.findOneBy({ id_tarea });
    if (!tarea) {
      throw new NotFoundException(`No existe la tarea ${id_tarea}`);
    }
    return tarea;
  }

  async update(id_tarea: number, data: UpdateTareaDto) {
    return await this.tareaRepository.update( id_tarea, data );
  }

  async remove(id_tarea: number) {
    return await this.tareaRepository.delete(id_tarea);
  }
}