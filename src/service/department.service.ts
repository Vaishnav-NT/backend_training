import DepartmentDto from "../dto/department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

    create = async (departmentData: DepartmentDto): Promise<Department> => {
        const department: Department = new Department();
        department.name = departmentData.name;
        return this.departmentRepository.create(department);
    };

    find = async (): Promise<Department[]> => {
        const departments = this.departmentRepository.find();
        if (!departments) {
            throw new HttpException(404, `No departments present`);
        }
        return departments;
    };

    findOneById = async (id: number): Promise<Department> => {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw new HttpException(
                404,
                `A department with id ${id} does not exist`
            );
        }
        return department;
    };

    put = async (
        id: number,
        departmentData: DepartmentDto
    ): Promise<Department> => {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw new HttpException(
                404,
                `A department with id ${id} does not exist`
            );
        }
        department.name = departmentData.name;
        return this.departmentRepository.patch(department);
    };

    patch = async (
        id: number,
        departmentData: DepartmentDto
    ): Promise<Department> => {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw new HttpException(
                404,
                `A department with id ${id} does not exist`
            );
        }
        department[Object.keys(departmentData)[0]] =
            departmentData[Object.keys(departmentData)[0]];
        return this.departmentRepository.patch(department);
    };

    delete = async (id: number) => {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw new HttpException(
                404,
                `A department with id ${id} does not exist`
            );
        }
        return this.departmentRepository.delete(department);
    };
}

export default DepartmentService;
