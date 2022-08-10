import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Tests for authenticateUserUseCase", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

  });
  it("Should be able to authenticate a user", async () => {

    const user = {
      name: "João",
      email: "joao@test.com",
      password: "123"
    };
    await createUserUseCase.execute(user)
    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(auth).toHaveProperty("token")
  })
  it("Should not be able to login if email is incorrect", async () => {
    expect(async () => {
      const user = {
        name: "João",
        email: "joao@test.com",
        password: "123"
      };
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: "joaoPicanha@test.com",
        password: user.password
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  });
  it("Should not be able to login if password is incorrect", async () => {
    expect(async () => {
      const user = {
        name: "João",
        email: "joao@test.com",
        password: "123"
      };
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "321"
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })

})
