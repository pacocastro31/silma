import server from "@/server";
import { UserModel } from "@/models/user.model";
import { AdminModel } from "@/models/admin.model";
import { TextModel } from "@/models/text.model";
import { WriterModel } from "@/models/writer.model";
import { ReaderModel } from "@/models/reader.model";
import { SuggestionModel } from "@/models/suggestion.model";
import { GenreModel } from "@/models/genre.model";
import axios from "axios";
import { createAdmin } from "@/controllers/admin.controller";

// Deletes all data from local.
const deleteEverything = async () => {
  await UserModel.deleteMany({});
  await AdminModel.deleteMany({});
  await WriterModel.deleteMany({});
  await ReaderModel.deleteMany({});
  await TextModel.deleteMany({});
  await SuggestionModel.deleteMany({});
  await GenreModel.deleteMany({});
};

// Creates the first admin from mongo, skiping security check.
const createFirstAdmin = () => {
  return new Promise(async (resolve, reject) => {
    await createAdmin({
      body: {
        name: "Admin 1",
        password: "prueba12345",
        email: "admin1@gmail.com",
        birthdate: "12/12/2000",
        phone: "8116690319",
        nationality: "Mexico",
        isSuperAdmin: true
      }
    }, { send: (data) => resolve(data) });
  });
};


const runAll = async () => {
  await deleteEverything();
  // Fills out genres with a preset.
  const genres = await axios.post("http://localhost:3000/api/admins/fillGenres");
  // Gets only the first 3 genres-
  const genreIds = genres.data.splice(0, 3).map(x => x._id);
  const admin1 = await createFirstAdmin();
  console.log('Admin 1: ', admin1._id);
  // Authenticates the first admin
  // This is done so the admin can create new admin users.
  const authAdmin = await axios.post("http://localhost:3000/api/user/authentication", {
    email: "admin1@gmail.com",
    password: "prueba12345"
  });
  const tokenAdmin = authAdmin.data.token;
  // Creates second admin.
  const admin2 = await axios.post("http://localhost:3000/api/admins/register", {
    name: "Admin 2",
    password: "prueba12345",
    email: "admin2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690318",
    nationality: "Mexico"
  }, { headers: { "Authorization": 'Bearer ' + tokenAdmin } });
  console.log('Admin 2: ', admin2.data._id);
  // Creates first reader.
  const reader1 = await axios.post("http://localhost:3000/api/register/readers", {
    name: "Reader 1",
    password: "prueba12345",
    email: "reader1@gmail.com",
    birthdate: "12/12/2000",
    phone: "8116690319",
    nationality: "Mexico",
    readingProficiency: "4 to 6",
    facebookLink: "https://www.facebook.com/reader1",
    readFrom: "12-01-2019",
    readTill: "12-01-2020",
    preferences: genreIds
  });
  console.log('Reader 1: ', reader1.data._id);
  // Creates second reader.
  const reader2 = await axios.post("http://localhost:3000/api/register/readers", {
    name: "Reader 2",
    password: "prueba12345",
    email: "reader2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "Mexico",
    readingProficiency: "4 to 6",
    facebookLink: "https://www.facebook.com/reader2",
    readFrom: "12-01-2019",
    readTill: "12-01-2020",
    preferences: genreIds
  });
  console.log('Reader 2: ', reader2.data._id);
  // Creates first writer.
  const writer1 = await axios.post("http://localhost:3000/api/register/writers", {
    name: "Writer 1",
    password: "prueba12345",
    email: "writer1@gmail.com",
    birthdate: "12/12/2000",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer1"
  });
  console.log('Writer 1: ', writer1.data._id);
  // Creates second writer.
  const writer2 = await axios.post("http://localhost:3000/api/register/writers", {
    name: "Writer 2",
    password: "prueba12345",
    email: "writer2@gmail.com",
    birthdate: "12/12/1996",
    phone: "8116690319",
    nationality: "Mexico",
    pseudonym: "writer2"
  });
  console.log('Writer 2: ', writer2.data._id);
  // Autheticates first writer to create texts.
  const auth = await axios.post("http://localhost:3000/api/user/authentication", {
    email: "writer1@gmail.com",
    password: "prueba12345"
  });
  const { token } = auth.data;
  // Writer1 creates first text.
  const text1 = await axios.post("http://localhost:3000/api/texts", {
    writer: writer1.data._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text A",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 50
  }, { headers: { "Authorization": 'Bearer ' + token } });
  console.log('Text 1: ', text1.data._id);
  // Writer1 creates second text.
  const text2 = await axios.post("http://localhost:3000/api/texts", {
    writer: writer1.data._id,
    genres: genreIds,
    ageRange: "10-12",
    title: "Text B",
    registerNumber: "123asd",
    description: "asd zxc qwe asd zxc asd zxc qwe asd zxc",
    numberOfPages: 120,
    numberOfChapters: 30
  }, { headers: { "Authorization": 'Bearer ' + token } });
  console.log('Text 2: ', text2.data._id);
};

try {
  runAll();
} catch (error) {
  console.error(error);
}