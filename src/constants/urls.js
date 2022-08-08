export const USERS_BASE = "/users";
export const ATTENDANCES_BASE = "/attendances";

export const users = {
  students: {
    ui: `${USERS_BASE}/students`,
    api: "/students",
  },
  teachers: {
    ui: `${USERS_BASE}/teachers`,
    api: "/teachers",
  },
  hods: {
    ui: `${USERS_BASE}/hods`,
    api: "/hods",
  },
};

export const attendancesAPI = {
  subjects: `${ATTENDANCES_BASE}/subjects/:subjectId`,
  students: `${ATTENDANCES_BASE}/students/:studentId`,
};
