export const checkIsAdminUsername = (username = ""): boolean => {
  return getAdminUsernames().includes(username);
};

export const getAdminUsernames = (): string[] => {
  return process.env.ADMIN_USERNAMES!.split(",");
};
