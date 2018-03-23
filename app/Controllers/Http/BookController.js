'use strict'

const Book = use("App/Models/Book")

class BookController {

  /* 
        index: Bertugas untuk menampilkan semua daftar buku
  */
  async index({ response }) {
    let books = await Book.all()

    return response.json(books)
  }

  /* 
        show: Bertugas untuk menampilkan satu buku berdasarkan ID buku
  */
  async show({ response, params }) {
    const book = await Book.find(params.id)

    return response.json(book)
  }

  /* 
        store: Bertugas untuk menyimpan/menambah buku
  */
  async store({ request, response }) {
    const bookInfo = request.only([
      "title",
      "isbn",
      "publisher_name",
      "author_name"
    ])

    const book = new Book()
    book.title = bookInfo.title
    book.isbn = bookInfo.isbn
    book.publisher_name = bookInfo.publisher_name
    book.author_name = bookInfo.author_name

    await book.save()

    return response.status(201).json(book)
  }

  /* 
        update: Bertugas untuk mengupdate data buku berdasarkan ID
  */
  async update({ params, request, response }) {
    const bookInfo = request.only([
      "title",
      "isbn",
      "publisher_name",
      "author_name"
    ])

    const book = await Book.find(params.id)

    if (!book) {
      return response.status(404).json({ data: "Buku tidak ditemukan" })
    }

    book.title = bookInfo.title
    book.isbn = bookInfo.isbn
    book.publisher_name = bookInfo.publisher_name
    book.author_name = bookInfo.author_name

    await book.save()

    return response.status(200).json(book)
  }

  /*
        delete: Bertugas untuk menghapus data buku berdasarkan ID
  */
  async delete({ params, response }) {
    const book = await Book.find(params.id)

    if (!book) {
      if (!book) {
        return response.status(404).json({ data: "Buku tidak ditemukan" })
      }
    }

    await book.delete()

    return response.status(204).json(null)
  }
}

module.exports = BookController