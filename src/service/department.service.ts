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
        const departments = await this.departmentRepository.find();
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

    // patch = async (
    //     id: number,
    //     departmentData: DepartmentDto
    // ): Promise<Department> => {
    //     const department = await this.departmentRepository.findById(id);
    //     if (!department) {
    //         throw new HttpException(
    //             404,
    //             `A department with id ${id} does not exist`
    //         );
    //     }

    //     for (const k in departmentData)
    //         if (!(k in department)) throw new HttpException(400, "Bad Request");

    //     const updateDepartment = {
    //         ...department,
    //         ...(departmentData as unknown as Department),
    //     };
    //     return this.departmentRepository.patch(department);
    // };

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

    // async count(): Promise<number> {
    //     return await this.departmentRepository.count();
    // }
}

export default DepartmentService;
