const baseUrl = "http://192.168.29.141:6000/api";

export default (APIS = {
  LOGIN: `${baseUrl}/v1/auth/`,
  REGISTER: `${baseUrl}/v1/users/`,
  TASKS: `${baseUrl}/v1/tasks/`
});
