const stringToArray = ({
  value,
  separator = ",",
}: {
  value: string;
  separator?: string;
}) => {
  return value.split(separator);
};

export default stringToArray;
