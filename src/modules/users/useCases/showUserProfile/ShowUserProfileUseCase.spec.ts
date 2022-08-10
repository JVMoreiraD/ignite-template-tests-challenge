import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Tests for ShowUserProfileUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
  });

  it("should be able to find a user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "João",
      email: "joao@test.com",
      password: "123"
    })
    const profile = await showUserProfileUseCase.execute(user.id)
    expect(profile).toBeInstanceOf(User)
  })
  it("Should not be able to find a non-existing user", async () => {
    expect(async () => {
      await showUserProfileUseCase.execute("123")
    }).rejects.toBeInstanceOf(ShowUserProfileError)
  })
})
