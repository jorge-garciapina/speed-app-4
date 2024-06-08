type EvaluateUserCredentialsInputType = {
  validatedUserEmail: string;
  validatedUserName: string;
};
export default function evaluateUserCredentials({
  validatedUserEmail,
  validatedUserName,
}: EvaluateUserCredentialsInputType) {
  return validatedUserEmail !== "" && validatedUserName !== "";
}
