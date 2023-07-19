import { z } from "zod";

const personSchema = z.object({
  name: z.string().min(1, { message: "Imię jest wymagane" }),
  age: z
    .number({ invalid_type_error: "Wiek musi być liczbą" })
    .positive({ message: "Wiek musi być liczbą dodatnią" }),
  birthDate: z.date(),
  bio: z
    .string()
    .max(255, { message: "Życiorys nie może być dłuższy niż 255 znaków" }),
});

export default personSchema;
