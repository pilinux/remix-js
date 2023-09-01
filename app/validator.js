export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

export function validatePassword(password) {
  // ,;.:-_#'+*@<>!"§$|%&/()[]=?{}\
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,;.:\-\_#\'+*@<>!"§$|%&/\(\)\[\]=?\{\}\\]).{6,}$/;
  return regex.test(password);
}
