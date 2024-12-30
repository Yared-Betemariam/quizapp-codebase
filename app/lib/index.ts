import { subjects } from "@/constants/data";

export const getSubjectFromId = (id: string) => {
  const subject = subjects.filter((item) => item.id === Number(id));
  return subject[0];
};
