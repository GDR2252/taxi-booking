export const jsonToForm = (values: Record<any, any>) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return formData;
};
