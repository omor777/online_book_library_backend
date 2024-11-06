const selectFields = (fields: string[] | undefined) => {
  if (Array.isArray(fields)) {
    fields.unshift("-_id");

    if (fields.includes("_id")) {
      fields.shift();
    }
  }

  return fields;
};

export default selectFields;
