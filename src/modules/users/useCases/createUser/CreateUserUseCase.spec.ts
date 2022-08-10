import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;


describe("Tests for CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to create a new user", async () => {

    const user = await createUserUseCase.execute({
      name: "João",
      email: "joao@test.com",
      password: "123"
    });

    expect(user).toHaveProperty("id")

  });

  it("Should not be able to create a new user with a email that is taken", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "João",
        email: "joao@test.com",
        password: "123"
      });
      await createUserUseCase.execute({
        name: "João Segundo",
        email: "joao@test.com",
        password: "123"
      })
    }).rejects.toBeInstanceOf(CreateUserError)

  })
})
