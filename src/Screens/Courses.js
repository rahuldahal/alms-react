import { Card } from "antd";
import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import Wrapper from "../components/Wrapper";
import { getAllCourses } from "../services/courses";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(courses.length <= 0);
  }, [courses]);

  useEffect(() => {
    (async () => {
      const { courses } = await getAllCourses();

      setCourses(courses);
    })();
  }, []);

  const Course = ({ course }) => {
    const { _id, courseName, shortName, affiliatedTo, duration } = course;

    return (
      <Card
        className="course"
        loading={loading}
        title={shortName}
        extra={<a href="#">Details</a>} // TODO: use <Link> to navigate
      >
        <div>
          <em>{courseName}</em>
          <p className="font-light">
            {affiliatedTo} - {duration}
          </p>
        </div>

        <div className="attendance">
          <small>Attendance:</small> <br />
          <p>
            <span>23</span>/<span>27</span>
          </p>
          <small>As of: {new Date().toLocaleDateString()}</small>
        </div>
      </Card>
    );
  };

  return (
    <Wrapper className="flex dashboard">
      <DashboardNav />

      <div className="courses flex wrap gap-4 items-center justify-center">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </Wrapper>
  );
}
