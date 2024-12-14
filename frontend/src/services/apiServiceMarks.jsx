const apiServiceMarks = {
    fetchStudentMarks: (usn) => {
      return fetch(`/student/${usn}/marks`).then(response => response.json());
    },
  
    fetchAllStudentsMarks: () => {
      return fetch('/admin/students').then(response => response.json());
    }
  };
  
  export default apiServiceMarks;
  