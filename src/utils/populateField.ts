const populateField = ({
  expand,
  field,
}: {
  expand?: string[];
  field: string;
}): string => {
  let populate = "";
  if (Array.isArray(expand)) {
    populate = expand.includes(field) ? field : "";
  }

  return populate;
};

export default populateField;
