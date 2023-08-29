import isEqual from 'lodash/isEqual';

export const compareValues = (updatedValues: any, initialValues: any) => {
  const fieldsToCheck = { ...updatedValues };
  delete fieldsToCheck.isActive;

  const initialFields = { ...initialValues };
  delete initialFields.isActive;

  return !isEqual(fieldsToCheck, initialFields);
};
