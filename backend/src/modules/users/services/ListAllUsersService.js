class ListAllUsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute() {
    return this.usersRepository.listAll()
  }
}

module.exports = ListAllUsersService
