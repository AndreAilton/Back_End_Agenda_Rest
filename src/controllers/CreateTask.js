import User from '../models/users.js';
import Task from '../models/Tasks.js';

class CreateTaskController {
    static async create(req, res) {
        try {
            const { title, description } = req.body;
            const task = new Task({
                userId: req.user.id,
                title,
                description,
                completed: false,
            });
            await task.save();
            res.status(201).json({ message: 'Tarefa criada com sucesso', task });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar tarefa', error });
        }
    }

    static async getAll(req, res) {
        try {
          const tasks = await Task.find({ userId: req.user.id }); // Filtra tarefas por userId
          res.status(200).json(tasks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao listar as tarefas' });
        }
      }

    static async update(req, res) {
        try {
            const taskId = req.params.id;
            const { title, description, completed } = req.body;
            console.log(req.body)
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
            task.title = title;
            task.description = description;
            task.completed = completed;
            await task.save();
            res.status(200).json({ message: 'Tarefa atualizada com sucesso', task });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
        }

    }

    static async delete(req, res) {
        try {
            const taskId = req.params.id;

            const task = await Task.findByIdAndDelete(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
            res.status(200).json({ message: 'Tarefa excluida com sucesso', task });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir tarefa', error });
        }
    }
}
export default CreateTaskController
            