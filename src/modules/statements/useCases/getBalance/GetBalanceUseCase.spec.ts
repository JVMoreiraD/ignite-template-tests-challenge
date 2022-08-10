import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";


let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Tests for GetBalanceUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    statementsRepositoryInMemory = new InMemoryStatementsRepository()
    getBalanceUseCase = new GetBalanceUseCase(
      statementsRepositoryInMemory,
      usersRepositoryInMemory)
  })
  it("Should be able to get the balance of a existing user", async () => {
    const user = await createUserUseCase.execute({
      name: "João",
      email: "joao@test.com",
      password: "123"
    });
    const balance = await getBalanceUseCase.execute({
      user_id: user.id,
    })
    expect(balance).toHaveProperty("statement")
    expect(balance).toHaveProperty("balance")
  })
  it("Should be able to get the balance of a existing user", async () => {
    expect(async () => {
      await getBalanceUseCase.execute({ user_id: 'none' })
    }).rejects.toBeInstanceOf(GetBalanceError)
  })
})
