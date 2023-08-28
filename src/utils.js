export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const validateForm = (
  firstName,
  lastName,
  selectedDOB,
  selectedStartDate,
  street,
  city,
  state,
  zipCode,
  selectedDepartment
) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "First Name is required";
  }

  if (!lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!selectedDOB) {
    errors.selectedDOB = "Date of Birth is required";
  } else {
    const age = calculateAge(selectedDOB);
    if (age < 18) {
      errors.selectedDOB = "Employee should be at least 18 years old";
    }
  }

  if (!selectedStartDate) {
    errors.selectedStartDate = "Start Date is required";
  } else if (
    selectedDOB &&
    selectedStartDate &&
    selectedDOB.toDateString() === selectedStartDate.toDateString()
  ) {
    errors.selectedStartDate =
      "Start Date should not be the same as Date of Birth";
  }

  if (!street) {
    errors.street = "Street is required";
  }

  if (!city) {
    errors.city = "City is required";
  }

  if (!state) {
    errors.state = "State is required";
  }

  if (!zipCode) {
    errors.zipCode = "Zip Code is required";
  }

  if (!selectedDepartment) {
    errors.selectedDepartment = "Department is required";
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};
