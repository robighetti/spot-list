module.exports = {
  async createList(request, response) {
    console.log(request.user)

    return response.json({ message: 'List Created and logged' })
  },
}
