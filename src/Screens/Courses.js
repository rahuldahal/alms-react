import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';
import Wrapper from '../components/Wrapper';
import useAuth from '../hooks/useAuth';
import { getAllCourses, getCoursesOfHOD } from '../services/courses';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const { role, hodId } = auth;

  useEffect(() => {
    setLoading(courses.length <= 0);
  }, [courses]);

  useEffect(() => {
    if (role === 'PRINCIPAL') {
      (async () => {
        const { courses } = await getAllCourses();

        setCourses(courses);
      })();
    }

    if (role === 'HOD') {
      (async () => {
        const { courses } = await getCoursesOfHOD({ hodId });

        setCourses(courses);
      })();
    }
  }, []);

  const Course = ({ course }) => {
    const { _id, courseName, shortName, affiliatedTo, duration } = course;
    const [durationTime, durationType] = duration.split(' ');
    const durationTimeInNumber = durationTime === 'Eight' ? 8 : 4;

    return (
      <Card
        className="course"
        loading={loading}
        title={shortName}
        extra={<a href="#">Details</a>} // TODO: use <Link> to navigate
      >
        <div>
          <p className="font-light">
            {affiliatedTo} - {duration}
          </p>
        </div>

        {/* <div className="attendance">
          <small>Attendance:</small> <br />
          <p>
            <span>23</span>/<span>27</span>
          </p>
          <small>As of: {new Date().toLocaleDateString()}</small>
        </div> */}
        <Semesters
          duration={durationTimeInNumber}
          durationType={durationType}
          course={_id}
        />
      </Card>
    );
  };

  const Semesters = ({ duration, durationType, course }) => {
    let semesters = [];

    for (let i = 1; i <= duration; i++) {
      semesters.push(
        <Link
          key={i}
          to={`/subjects?course=${course}&semester=${i}`}
          className="semester"
        >
          {i}
        </Link>
      );
    }

    return (
      <div>
        <small className="mb-2">
          Choose a {durationType === 'Semesters' ? 'semester' : 'year'}:
        </small>
        <div className="semesters w-100 flex">{semesters}</div>
      </div>
    );
  };

  return (
    <Wrapper className="flex dashboard">
      <DashboardNav />

      <div className="courses flex wrap gap-8 items-center justify-center">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </Wrapper>
  );
}
