export default {
    PRINCIPAL: {
        routes: ['students', 'teachers', 'hods'],
        default: 'students'
    },
    HOD: {
        routes: ['students', 'teachers'],
        default: 'students'
    },
    TEACHER: {
        routes: ['students'],
        default: 'students'
    },
    STUDENT: {
        routes: ['my-attendance']
    }
}